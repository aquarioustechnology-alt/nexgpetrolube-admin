"use client"
import * as React from "react"
import { Users, ShieldCheck, Hourglass, Users2, ClipboardList, Undo2, CheckCheck, Gavel,
         ListChecks, Repeat2, ShieldAlert, Package, MessageSquareWarning, Ban,
         Scale, Percent, FileCheck, Wallet, Webhook, FolderTree, MapPin, BookOpen,
         Newspaper, LineChart, History, Plug2, Shield, Timer, Pin } from "lucide-react"

export type Kpi = { label: string; value: string | number; icon?: React.ReactNode; hint?: string; }

export const KPI = {
  users(data:any[]){ 
    const total = data?.length ?? 0
    const verified = data?.filter((x:any)=>x.kyc==="Verified").length ?? 0
    const pending  = data?.filter((x:any)=>x.kyc==="Pending").length ?? 0
    const both     = data?.filter((x:any)=>x.role==="Both").length ?? 0
    return [
      {label:"Total Users", value: total,   icon: React.createElement(Users, { className: "h-4 w-4" })},
      {label:"Verified",    value: verified, icon: React.createElement(ShieldCheck, { className: "h-4 w-4" })},
      {label:"Pending KYC", value: pending, icon: React.createElement(Hourglass, { className: "h-4 w-4" }), hint:"Awaiting review"},
      {label:"Both Role",   value: both,    icon: React.createElement(Users2, { className: "h-4 w-4" })},
    ] as Kpi[]
  },
  listings(data:any[]){
    const pending = data?.filter((x:any)=>x.status==="Pending").length ?? 0
    const sent    = data?.filter((x:any)=>x.status==="Sent Back").length ?? 0
    const approved= data?.filter((x:any)=>x.status==="Approved").length ?? 0
    const bidding = data?.filter((x:any)=>x.type==="Bidding").length ?? 0
    return [
      {label:"Pending Listings", value: pending, icon: React.createElement(ClipboardList, { className: "h-4 w-4" }), hint: undefined},
      {label:"Sent Back",        value: sent,    icon: React.createElement(Undo2, { className: "h-4 w-4" }), hint: undefined},
      {label:"Approved Today",   value: approved,icon: React.createElement(CheckCheck, { className: "h-4 w-4" }), hint:"Last 24h (mock)"},
      {label:"Bidding Type",     value: bidding, icon: React.createElement(Gavel, { className: "h-4 w-4" }), hint: undefined},
    ]
  },
  requirements(data:any[]){
    const open = data?.length ?? 0
    const reverse = data?.filter((x:any)=>x.mode==="Reverse").length ?? 0
    const regulated = data?.filter((x:any)=>x.regulated).length ?? 0
    const totalQty = (data||[]).reduce((s:number,x:any)=>s+(x.qty||0),0)
    return [
      {label:"Open Requirements", value: open,     icon: React.createElement(ListChecks, { className: "h-4 w-4" }), hint: undefined},
      {label:"Reverse Mode",      value: reverse,  icon: React.createElement(Repeat2, { className: "h-4 w-4" }), hint: undefined},
      {label:"Regulated Requests",value: regulated,icon: React.createElement(ShieldAlert, { className: "h-4 w-4" }), hint: undefined},
      {label:"Total Qty",         value: totalQty, icon: React.createElement(Package, { className: "h-4 w-4" }), hint:"Sum of qty"},
    ]
  },
  auctionsReverse(data:any[]){
    const live   = data?.filter((x:any)=>x.type==="Reverse" && x.status==="Live").length ?? 0
    const bidders= (data||[]).reduce((s:number,x:any)=>s+(x.bidders||0),0)
    const bids   = (data||[]).reduce((s:number,x:any)=>s+(x.bidsToday||0),0)
    const premium= (data?.length? (data.reduce((s:number,x:any)=>s+(x.avgPremium||0),0)/data.length):0).toFixed(1)+"%"
    return [
      {label:"Live Auctions", value: live,    icon: React.createElement(Gavel, { className: "h-4 w-4" }), hint: undefined},
      {label:"Total Bidders", value: bidders, icon: React.createElement(Users, { className: "h-4 w-4" }), hint: undefined},
      {label:"Bids Today",    value: bids,    icon: React.createElement(History, { className: "h-4 w-4" }), hint:"Sum of live rooms"},
      {label:"Avg. Premium",  value: premium, icon: React.createElement(Percent, { className: "h-4 w-4" }), hint: undefined},
    ]
  },
  auctionsTraditional(data:any[]){
    return KPI.auctionsReverse(data) // same shape; values come from traditional subset
  },
  chat(data:any[]){
    const flagged = data?.filter((x:any)=>x.type==="flag").length ?? 0
    const mutes   = data?.filter((x:any)=>x.action==="mute").length ?? 0
    const kicks   = data?.filter((x:any)=>x.action==="kick").length ?? 0
    return [
      {label:"Flagged Today", value: flagged, icon: React.createElement(MessageSquareWarning, { className: "h-4 w-4" }), hint: undefined},
      {label:"Mutes",         value: mutes,   icon: React.createElement(Ban, { className: "h-4 w-4" }), hint: undefined},
      {label:"Kicks",         value: kicks,   icon: React.createElement(Ban, { className: "h-4 w-4" }), hint: undefined},
      {label:"Open Rooms",    value: (data?.[0]?.openRooms ?? 0), icon: React.createElement(ListChecks, { className: "h-4 w-4" }), hint: undefined},
    ]
  },
  disputes(data:any[]){
    const open = data?.filter((x:any)=>x.status==="Open").length ?? 0
    const resolved7d = data?.filter((x:any)=>x.resolvedInLast7d).length ?? 0
    const sla = (data?.length? (data.reduce((s:number,x:any)=>s+(x.slaHours||0),0)/data.length):0).toFixed(1)+"h"
    const escRate = ((data?.filter((x:any)=>x.escalated).length ?? 0) * 100 / (data?.length||1)).toFixed(0)+"%"
    return [
      {label:"Open Disputes", value: open,       icon: React.createElement(Scale, { className: "h-4 w-4" }), hint: undefined},
      {label:"Resolved (7d)", value: resolved7d, icon: React.createElement(FileCheck, { className: "h-4 w-4" }), hint: undefined},
      {label:"Avg. SLA",      value: sla,        icon: React.createElement(Timer, { className: "h-4 w-4" }), hint: undefined},
      {label:"Escalation Rate",value: escRate,   icon: React.createElement(Percent, { className: "h-4 w-4" }), hint: undefined},
    ]
  },
  commissions(rules:any[]){
    const active = rules?.filter((x:any)=>x.active).length ?? 0
    const pending= rules?.filter((x:any)=>x.pending).length ?? 0
    return [
      {label:"Active Rules", value: active, icon: React.createElement(Percent, { className: "h-4 w-4" }), hint: undefined},
      {label:"Pending Drafts", value: pending, icon: React.createElement(ClipboardList, { className: "h-4 w-4" }), hint: undefined},
      {label:"Last Updated", value: rules?.[0]?.updatedAt || "—", icon: React.createElement(History, { className: "h-4 w-4" })},
      {label:"Scopes", value: rules?.[0]?.scopes || 0, icon: React.createElement(FolderTree, { className: "h-4 w-4" })},
    ]
  },
  invoices(inv:any[], webhooks:any[]){
    const dueToday = inv?.filter((x:any)=>x.dueToday).length ?? 0
    const overdue  = inv?.filter((x:any)=>x.overdue).length ?? 0
    const paidMtd  = inv?.filter((x:any)=>x.paidThisMonth).length ?? 0
    const failures = webhooks?.filter((w:any)=>w.status==="failed").length ?? 0
    return [
      {label:"Due Today", value: dueToday, icon: React.createElement(Wallet, { className: "h-4 w-4" }), hint: undefined},
      {label:"Overdue",   value: overdue,  icon: React.createElement(ShieldAlert, { className: "h-4 w-4" }), hint: undefined},
      {label:"Paid (MTD)",value: paidMtd,  icon: React.createElement(FileCheck, { className: "h-4 w-4" }), hint: undefined},
      {label:"Webhook Failures", value: failures, icon: React.createElement(Webhook, { className: "h-4 w-4" }), hint: undefined},
    ]
  },
  reconciliation(webhooks:any[]){
    const failed24h = webhooks?.filter((x:any)=>x.failed24h).length ?? 0
    const retryRate = (webhooks?.[0]?.retrySuccessRate ?? 0) + "%"
    const providers = new Set((webhooks||[]).map((x:any)=>x.provider)).size
    return [
      {label:"Failures (24h)", value: failed24h, icon: React.createElement(Webhook, { className: "h-4 w-4" }), hint: undefined},
      {label:"Retry Success",  value: retryRate, icon: React.createElement(CheckCheck, { className: "h-4 w-4" }), hint: undefined},
      {label:"Providers",      value: providers, icon: React.createElement(Plug2, { className: "h-4 w-4" }), hint: undefined},
      {label:"Open Incidents", value: webhooks?.filter((x:any)=>x.incidentOpen).length ?? 0, icon: React.createElement(Shield, { className: "h-4 w-4" }), hint: undefined},
    ]
  },
  masters(m:any){
    const cat = m?.categories?.length ?? 0, sub = m?.subcategories?.length ?? 0, brands = m?.brands?.length ?? 0, units = m?.units?.length ?? 0
    return [
      {label:"Categories", value: cat,   icon: React.createElement(FolderTree, { className: "h-4 w-4" }), hint: undefined},
      {label:"Sub-categories", value: sub, icon: React.createElement(FolderTree, { className: "h-4 w-4" }), hint: undefined},
      {label:"Brands", value: brands,   icon: React.createElement(BookOpen, { className: "h-4 w-4" }), hint: undefined},
      {label:"Units",  value: units,    icon: React.createElement(Package, { className: "h-4 w-4" }), hint: undefined},
    ]
  },
  authMap(m:any){
    return [
      {label:"Restricted States", value: m?.restrictedStates ?? 0, icon: React.createElement(MapPin, { className: "h-4 w-4" }), hint: undefined},
      {label:"Regulated Materials", value: m?.regulatedMaterials ?? 0, icon: React.createElement(ShieldAlert, { className: "h-4 w-4" }), hint: undefined},
      {label:"Pending Proofs", value: m?.pendingProofs ?? 0, icon: React.createElement(FileCheck, { className: "h-4 w-4" }), hint: undefined},
      {label:"Authorizations", value: m?.authorizations ?? 0, icon: React.createElement(ShieldCheck, { className: "h-4 w-4" }), hint: undefined},
    ]
  },
  cms(pages:any[]){
    const drafts = pages?.filter((x:any)=>x.status==="draft").length ?? 0
    const published = pages?.filter((x:any)=>x.status==="published").length ?? 0
    return [
      {label:"Draft Pages", value: drafts, icon: React.createElement(BookOpen, { className: "h-4 w-4" }), hint: undefined},
      {label:"Published",   value: published, icon: React.createElement(FileCheck, { className: "h-4 w-4" }), hint: undefined},
      {label:"Last Updated",value: pages?.[0]?.updatedAt || "—", icon: React.createElement(History, { className: "h-4 w-4" })},
      {label:"Banners", value: (pages?.[0]?.banners ?? 0), icon: React.createElement(Newspaper, { className: "h-4 w-4" }), hint: undefined},
    ]
  },
  news(items:any[]){
    const pending = items?.filter((x:any)=>x.status==="pending").length ?? 0
    const published = items?.filter((x:any)=>x.status==="published").length ?? 0
    return [
      {label:"Pending", value: pending, icon: React.createElement(ClipboardList, { className: "h-4 w-4" }), hint: undefined},
      {label:"Published", value: published, icon: React.createElement(Newspaper, { className: "h-4 w-4" }), hint: undefined},
      {label:"Pinned", value: items?.filter((x:any)=>x.pinned).length ?? 0, icon: React.createElement(Pin, { className: "h-4 w-4" }), hint: undefined},
      {label:"Sources", value: new Set((items||[]).map((x:any)=>x.source)).size, icon: React.createElement(Plug2, { className: "h-4 w-4" }), hint: undefined},
    ]
  },
  reports(_any:any){
    return [
      {label:"GMV (MTD)", value: "₹—", icon: React.createElement(LineChart, { className: "h-4 w-4" }), hint:"Bind analytics later"},
      {label:"Take Rate", value: "—%", icon: React.createElement(Percent, { className: "h-4 w-4" }), hint: undefined},
      {label:"Active Users", value: "—", icon: React.createElement(Users, { className: "h-4 w-4" }), hint: undefined},
      {label:"Exports (24h)", value: "—", icon: React.createElement(FileCheck, { className: "h-4 w-4" }), hint: undefined},
    ]
  },
  audit(items:any[]){
    return [
      {label:"Actions Today", value: items?.filter((x:any)=>x.today).length ?? 0, icon: React.createElement(History, { className: "h-4 w-4" }), hint: undefined},
      {label:"Actors (24h)", value: new Set((items||[]).map((x:any)=>x.actor)).size, icon: React.createElement(Users, { className: "h-4 w-4" }), hint: undefined},
      {label:"Entries (7d)", value: items?.filter((x:any)=>x.week).length ?? 0, icon: React.createElement(ClipboardList, { className: "h-4 w-4" }), hint: undefined},
      {label:"Retention", value: (items?.[0]?.retentionDays ?? 90)+"d", icon: React.createElement(Shield, { className: "h-4 w-4" }), hint: undefined},
    ]
  },
  integrations(items:any[]){
    const connected = items?.filter((x:any)=>x.connected).length ?? 0
    const failing   = items?.filter((x:any)=>x.status==="error").length ?? 0
    const lastEvent = items?.[0]?.lastEvent || "—"
    return [
      {label:"Providers Connected", value: connected, icon: React.createElement(Plug2, { className: "h-4 w-4" }), hint: undefined},
      {label:"Failing", value: failing, icon: React.createElement(ShieldAlert, { className: "h-4 w-4" }), hint: undefined},
      {label:"Last Event", value: lastEvent, icon: React.createElement(History, { className: "h-4 w-4" }), hint: undefined},
      {label:"Webhooks", value: items?.filter((x:any)=>x.type==="webhook").length ?? 0, icon: React.createElement(Webhook, { className: "h-4 w-4" }), hint: undefined},
    ]
  },
  roles(users:any[], roles:any[]){
    const admins = users?.filter((x:any)=>x.role==="Both" || x.role==="Admin").length ?? 0
    return [
      {label:"Roles", value: roles?.length ?? 0, icon: React.createElement(Shield, { className: "h-4 w-4" }), hint: undefined},
      {label:"Users with Admin", value: admins, icon: React.createElement(Users, { className: "h-4 w-4" }), hint: undefined},
      {label:"Last Change", value: roles?.[0]?.updatedAt || "—", icon: React.createElement(History, { className: "h-4 w-4" }), hint: undefined},
      {label:"Permissions", value: roles?.[0]?.perms ?? 0, icon: React.createElement(FileCheck, { className: "h-4 w-4" }), hint: undefined},
    ]
  },
  kyc(data:any[]){
    const total = data?.length ?? 0
    const pending = data?.filter((x:any)=>x.status==="pending").length ?? 0
    const approved = data?.filter((x:any)=>x.status==="approved").length ?? 0
    const rejected = data?.filter((x:any)=>x.status==="rejected").length ?? 0
    return [
      {label:"Total Submissions", value: total, icon: React.createElement(Users, { className: "h-4 w-4" }), hint: undefined},
      {label:"Pending Review", value: pending, icon: React.createElement(Hourglass, { className: "h-4 w-4" }), hint: undefined},
      {label:"Approved", value: approved, icon: React.createElement(CheckCheck, { className: "h-4 w-4" }), hint: undefined},
      {label:"Rejected", value: rejected, icon: React.createElement(Ban, { className: "h-4 w-4" }), hint: undefined},
    ]
  },
}