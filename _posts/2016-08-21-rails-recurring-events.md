---
layout: post
title: "Recurring events in Rails"
date:  2016-08-21 22:51:41 +05:30
categories: rails
---

Modeling recurring events in a calendar is an interesting problem to solve.
There are many different scenarios
in which you might need to model recurring events,
but in this article I will walk through
a simple example of weekly recurring events in a Rails app.

Although this post covers most of the code needed for the example,
I will skip over some of the details (such as views),
and you will have to fill in the blanks in such places.

Much of the code here is taken from a real project I'm working on,
and I've tried to simplify the code as much as possible.
However, some of the tradeoffs that I needed in my project
aren't really needed in this example.
I have pointed out some cases where this is true.

## Scheduling weekly events

Let's take an example where we will need to model weekly recurring events:

> Our users want to be able to save weekly events,
with a day of the week and a time.
The system will perform an action every week on that day and time.
For example, a user could set up a reminder
("remind me to send status report at 5pm every Friday"),
and the system should send an email at that time every week.

## Modeling recurring events

Before we start writing the code for scheduling events,
let's briefly think about how we will implement this.

We will start with a `RecurringEvent` model,
which will contain the day and time at which the event must be performed.
We could also call this model something like `Reminder`,
but since we could have other things in future that could be recurring,
I prefer having a `RecurringEvent` model and associate that with other models.
To keep things simple in this post,
we will just have a `reminder` string field in the `RecurringEvent` model.

The user will create a recurring event using a form
that contains the following fields:

- reminder (eg. "Send weekly status report")
- time - we will just save a string containing the time, (eg. "5:00 pm")
- day - day of the week, as an integer (0 for Sunday, 1 for Monday, etc)

We will use an `Event` model to save the actual time at which
a `RecurringEvent` occurs.
We will save the next instance of the recurring event in the `Event` model.

We will also use `ActiveJob` to schedule the event at the correct time
using the `RunEventJob` class.
This `ActiveJob` class will execute the action that should happen at the time
(sending the reminder email, in this example),
and also create the next instance of the event.

## Creating a new RecurringEvent

Let's start off by creating the `RecurringEvent` model:

{% highlight ruby %}
# rails generate model RecurringEvent \
# 	reminder:string time:string day:integer user:belongs_to

# app/models/recurring_event.rb
class RecurringEvent < ApplicationRecord
  belongs_to :user
  has_many :events, dependent: :destroy

  TIME_12H_FORMAT = /\A(1[0-2]|0?[1-9]):[0-5][0-9]\s?(am|pm)\z/i

  validates :time, presence: true,
    format: { with: TIME_12H_FORMAT, message: 'invalid time - use format 10:00 am' }
end
{% endhighlight %}

We will start with a new page for creating a new recurring event by implementing
`RecurringEventsController#new` action.

{% highlight ruby %}
class RecurringEventsController < ApplicationController
  before_action :authenticate_user!

  def new
    @recurring_event = RecurringEvent.new
  end
end
{% endhighlight %}

The form (`app/views/recurring_events/new.html.haml`)
for adding a new recurring event looks like this:

{% highlight haml %}
<%= form_for(recurring_event) do |f| %>
  <div class="field">
    <%= f.label :day %>
    <%= f.select :day, Date::DAYNAMES.zip(0..6) %>
  </div>

  <div class="field">
    <%= f.label :time %>
    <%= f.text_field :time %>
  </div>

  <div class="field">
    <%= f.label :reminder %>
    <%= f.text_field :reminder %>
  </div>

  <div class="actions">
    <%= f.submit 'Save', class: 'btn btn-primary' %>
  </div>
<% end %>
{% endhighlight %}

The next thing to do is to implement the `RecurringEventsController#create` action.
This is where things get a little interesting.

{% highlight ruby %}
# app/controllers/recurring_events_controller.rb
class RecurringEvent < ApplicationRecord
  # ...

  def create
    @recurring_event =
      RecurringEvents::Create.new(current_user, recurring_event_params).call

    if @recurring_event.persisted?
      redirect_to @recurring_event, notice: 'Event was successfully created.'
    else
      render :new
    end
  end

  private
  def recurring_event_params
    params.require(:recurring_event).permit(:day, :time, :reminder)
  end
end
{% endhighlight %}

I like to put this kind of business logic code in `app/services`.
`RecurringEvents::Create` must do three things:

- save the recurring event
- calculate the date of next instance of the event and save it
- schedule a background job to run at that time

We will come back to the `RecurringEvents::Create` class,
but first we need an `Event` model
where we store the next occurence of a recurring event.

{% highlight ruby %}
# rails generate model Event run_at:datetime recurring_event:belongs_to

# app/models/event.rb
class Event < ApplicationRecord
  belongs_to :recurring_event
  # also add the corresponding has_many in RecurringEvent

  scope :future, -> { where('created_at > ?', DateTime.now) }
end
{% endhighlight %}

We could simplify this a great deal
by making `run_at` a field in `RecurringEvent`,
but I've added a separate model in my project because
I'd like to log other information of the occurence later on.

## Calculate next date for the event

We also need to calculate the date
for the next occurence of a recurring event.
For this, I use another plain Ruby class in `app/services`
that takes a `RecurringEvent` instance and returns a date.

One thing I haven't addressed in this code is timezones,
and we will fix that later on in this article.

{% highlight ruby %}
# app/services/next_recurring_event_date.rb
class NextRecurringEventDate < Struct.new(:recurring_event)
  def calculate
    # TODO: Needs to handle user timezones
    t = Time.zone.now.next_week(day_of_week) + offset.seconds
    [(t-7.days), t].detect(&:future?).utc
  end

  private

  # Convert integer to symbol
  def day_of_week
    Date::DAYNAMES.fetch(recurring_event.day).downcase.to_sym
  end

  def offset
    t, am_pm = recurring_event.time.downcase.split(' ')
    hh, mm = t.split(':')
    am_pm_offset = (am_pm == 'pm' ? 3600*12 : 0)
    offset = Integer(hh)*3600 + Integer(mm)*60
    offset + am_pm_offset
  end
end
{% endhighlight %}

## Persisting a `RecurringEvent`

Now that we have everything in place, let's look at `RecurringEvents::Create`.
Here we just persist a `RecurringEvent` to the database,
and call `Events::Schedule` service class to create a new instance of `Event`
with the `run_at` field set correctly.

{% highlight ruby %}
# app/services/recurring_events/create.rb
class RecurringEvents::Create < Struct.new(:user, :params)
  def call
    recurring_event = user.recurring_events.build(params)
    recurring_event.save &&
      Events::Schedule.new(recurring_event).call
    recurring_event
  end
end
{% endhighlight %}

Let's look at the `Events::Schedule` class, which does the following:

- Creates an instance of the `Event` class and sets the `run_at` field.
- Schedules a background job that will run at `Event#run_at`.
  This will be handled by the `RunEventJob` ActiveJob class.

{% highlight ruby %}
# app/services/events/schedule.rb
class Events::Schedule < Struct.new(:recurring_event)
  def call
    next_date = NextRecurringEventDate.new(recurring_event).calculate
    event = recurring_event.events.build(run_at: next_date)
    event.save && schedule_background_job(event)
  end

  private

  def schedule_background_job(event)
    RunEventJob.set(wait_until: event.run_at)
      .perform_later(event)
  end
end
{% endhighlight %}

The `RunEventJob` should contain the code for whatever should happen at the time,
and at the end calls `Events::Schedule#call`
to queue up the next occurence of the event.

{% highlight ruby %}
class RunEventJob < ApplicationJob
  queue_as :default

  def perform(event)
    # Perform the relevant work here. Example:
    # ReminderMailer.notify(event).deliver_later!

    # Schedule the next occurence of the event
    Events::Schedule.new(event.recurring_event).call
  end
end
{% endhighlight %}

## Timezone considerations

Remember the timezone problem I mentioned in `NextRecurringEventDate#calculate`?
When a user wants to send a reminder at "Friday 5PM",
they usually mean 5pm on Friday in their timezone.
We should make sure that the event time that we calculate
uses the correct timezone offset.

In this article I have not mentioned a `User` model.
Let's assume that we do have such a model,
and we have associated `RecurringEvent` as belonging to a user.

We will also need to be aware of the user timezone.
This is another thing that I will not be addressing in this article,
but let's assume that we can access the user's timezone as
`recurring_event.user.timezone`.
(My previous article on
[setting user timezones during user signup](/posts/rails-user-timezones/)
might be useful at this point.)

{% highlight ruby %}
# app/services/next_recurring_event_date.rb
class NextRecurringEventDate < Struct.new(:recurring_event)
  def calculate
    t = Time.use_zone(recurring_event.user.timezone) {
      Time.zone.now.next_week(day_of_week) + offset.seconds
    }
    [(t-7.days), t].detect(&:future?).utc
  end
end
{% endhighlight %}

With that, we now have a working weekly recurring events system.
There are many more things to consider, though,
and I will list some gotchas below.

## Wrapping up

A couple of gotchas you might need to consider
if you're building a similar feature:

- When you allow users to delete a `RecurringEvent`,
  you might see the `ActiveJob::DeserializationError` in the `RunEventJob`.
  This exception could also be caused by other factors,
  such as the database being down.
  We need to always retry unless the exception is `ActiveRecord::RecordNotFound`.
  The following code achieves that:

{% highlight ruby %}
class RunEventJob < ApplicationJob
  rescue_from ActiveJob::DeserializationError do |exception|
    exception.original_exception == ActiveRecord::RecordNotFound
  end
  # ...
end
{% endhighlight %}

- When users edit a `RecurringEvent`,
  make sure that you update the next `Event` occurence.

As I mentioned at the start of the article,
there are places where I've retained code
that isn't needed in a simple example like this one.
For instance, I needed a model for each event occurence
because I need to add additional information there,
but here you could just use a field in the `RecurringEvent` model.

There are other scenarios in which you might need recurring events,
such as "second Saturday of every month",
and this article doesn't cover such advanced scenarios.

If you're looking a more complex example, take a look at
[Martin Fowler's excellent article [PDF]](http://martinfowler.com/apsupp/recurring.pdf)
on modeling recurring events using temporal expressions.

## Links

- [Recurring Events for Calendars](http://martinfowler.com/apsupp/recurring.pdf)
- [Recurrence gem](https://github.com/fnando/recurrence)
- [Recurring events](http://blog.plataformatec.com.br/2010/04/recurring-events/) article on Plataformatec blog

Update:
As Swanand points out in the comments, the
[recurrence rules section in iCalendar specification (RFC 5545)](https://tools.ietf.org/html/rfc5545#section-3.3.10)
is an interesting read if you're interested in exploring further.
