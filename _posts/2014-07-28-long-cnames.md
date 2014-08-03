---
layout: post
title: "Problem Resolving Long CNAME DNS Records"
date:  2014-08-03 16:27:52
categories: programming
---

A few weeks ago, some of our users started reporting that they could no longer reach our site. Things were working fine for the vast majority, but for the rest, it was as if the site did not exist.

Triaging this issue was a challenge. `nslookup` showed the CNAME record for the AWS load balancer was getting resolved just fine for us, but we obviously couldn't check this from the users' end. Luckily the same problem appeared at a coworkers apartment, so we were able to run `nslookup` and confirm that the problem was actually with resolving the CNAME.

Then someone mentioned that they too had faced this with a load balancer that had a long CNAME. We were using a 10 character name for the Amazon ELB load balancer, and this string was added to the CNAME. Changing this to a single character solved the issue.

## Why this happened

Looking around AWS forums (see [here](https://forums.aws.amazon.com/thread.jspa?threadID=42782&tstart=0) and [here](https://forums.aws.amazon.com/thread.jspa?messageID=187411)), I found out more about why this was happening.

It turns out that some firewalls reject UDP DNS packets that are longer than 512 bytes. The CNAME I had used initially made the packets just longer than this limit. Apparently the UDP DNS packet sizes were originally limited to 512 bytes in [RFC 1035](http://www.faqs.org/rfcs/rfc1035.html), but the [EDNS](https://tools.ietf.org/html/rfc2671) has since then been invented to address these limitations.

These firewalls are from pre-EDNS days, so they are configured by default to accept only 512 byte packets. They can be configured to allow larger packets, but it appears that the ISPs of some of our users haven't done this.

## Lessons learned

Tracking down a bug that originated in an unexpected place like this was... well, interesting, but also frustrating. Compared to this, it is so much easier to track down bugs in the source code.

I had naively believed that not supporting older versions of Internet Explorer would shield me from most of the headaches of legacy support. It's good to be reminded that the web has more moving parts than just the browser and the server. And all those moving parts certainly have their own equivalents of Internet Explorer 6

## References

- [Your firewall is preventing you from using EDNS0](http://homepage.ntlworld.com/jonathan.deboynepollard/FGA/dns-edns0-and-firewalls.html)
- [Cisco Document on DNSSEC](http://www.cisco.com/web/about/security/intelligence/dnssec.html)
- [ OARC's DNS Reply Size Test Server](https://www.dns-oarc.net/oarc/services/replysizetest)
- [ServerFault: Do Firewalls Drop UDP Queries That Are Longer Than 512 Bytes?](http://serverfault.com/questions/76660/do-firewalls-drop-udp-dns-queries-that-are-longer-than-512-bytes)

