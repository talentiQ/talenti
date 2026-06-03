"use client";

import { useState, useEffect, useRef, useCallback, type CSSProperties } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://cdn.jsdelivr.net/npm/@fontsource/sora@5.0.17/index.css');
  @import url('https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.17/index.css');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.0.0/dist/tabler-icons.min.css');

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --navy:#1E3A5F; --blue:#2563EB; --blue-50:#EFF6FF; --blue-100:#DBEAFE;
    --blue-dark:#1D4ED8; --indigo:#4F46E5; --red:#DC2626; --gold:#C8A96B;
    --gold-bg:#FDF6EC; --charcoal:#0F172A; --gray-50:#F8FAFC; --gray-100:#F1F5F9;
    --gray-200:#E2E8F0; --gray-300:#CBD5E1; --gray-400:#94A3B8; --gray-500:#64748B;
    --gray-600:#475569; --gray-700:#334155; --white:#FFFFFF;
    --fh:'Sora',system-ui,-apple-system,sans-serif;
    --fb:'Inter',system-ui,-apple-system,sans-serif;
  }
  html{scroll-behavior:smooth;font-size:16px}
  body{font-family:var(--fb);color:var(--charcoal);background:var(--white);line-height:1.6;-webkit-font-smoothing:antialiased}
  h1,h2,h3,h4,h5{font-family:var(--fh);line-height:1.2;color:var(--charcoal)}
  a{text-decoration:none;color:inherit}
  img{max-width:100%;display:block}
  button{font-family:var(--fb);cursor:pointer}
  .t-container{max-width:1200px;margin:0 auto;padding:0 24px}

  .t-logo img {max-height: 50px;width: auto;}
  
  /* NAV */
  .t-nav{position:sticky;top:0;z-index:100;background:rgba(255,255,255,0.96);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--gray-100)}
  .t-nav-inner{display:flex;align-items:center;justify-content:space-between;height:68px;gap:24px}
  .t-logo{display:flex;align-items:center;gap:10px;flex-shrink:0}
  .t-logo-text{font-family:var(--fh);font-size:22px;font-weight:800;color:#243F5E;letter-spacing:-0.02em}
  .t-logo-text span{color:var(--red)}
  .t-nav-links{display:flex;align-items:center;gap:28px;list-style:none}
  .t-nav-links a{font-size:14px;font-weight:500;color:var(--gray-600);transition:color 0.2s;cursor:pointer}
  .t-nav-links a:hover{color:var(--blue)}
  .t-nav-cta{display:flex;align-items:center;gap:10px;flex-shrink:0}
  .t-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;font-family:var(--fb);cursor:pointer;transition:all 0.2s;border:none;text-decoration:none;line-height:1}
  .t-btn-primary{background:var(--blue);color:white;box-shadow:0 4px 12px rgba(37,99,235,0.28)}
  .t-btn-primary:hover{background:var(--blue-dark);box-shadow:0 6px 20px rgba(37,99,235,0.38);transform:translateY(-1px)}
  .t-btn-outline{background:transparent;color:var(--charcoal);border:1.5px solid var(--gray-200)}
  .t-btn-outline:hover{border-color:var(--blue);color:var(--blue)}
  .t-btn-lg{padding:14px 28px;font-size:15px}
  .t-btn-xl{padding:15px 32px;font-size:16px;border-radius:10px}
  .t-hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px}
  .t-hamburger span{display:block;width:22px;height:2px;background:var(--charcoal);border-radius:2px;transition:all 0.3s}

  /* MOBILE NAV */
  .t-mobile-nav{display:none;position:fixed;inset:0;background:white;z-index:200;flex-direction:column}
  .t-mobile-nav.open{display:flex}
  .t-mob-head{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--gray-100)}
  .t-mob-links{padding:24px;display:flex;flex-direction:column;gap:4px;flex:1}
  .t-mob-links a{font-size:18px;font-weight:600;font-family:var(--fh);color:var(--charcoal);padding:14px 0;border-bottom:1px solid var(--gray-50);display:block;cursor:pointer}
  .t-mob-links a:hover{color:var(--blue)}
  .t-mob-footer{padding:24px}

  /* HERO */
  .t-hero{background:linear-gradient(145deg,#F8FAFC 0%,#EFF6FF 55%,#F0F4FF 100%);padding:96px 0 72px;position:relative;overflow:hidden}
  .t-hero::before{content:'';position:absolute;top:-120px;right:-120px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,0.06) 0%,transparent 70%);pointer-events:none}
  .t-hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center}
  .t-badge{display:inline-flex;align-items:center;gap:8px;background:var(--blue-50);border:1px solid var(--blue-100);color:var(--blue);padding:6px 14px;border-radius:100px;font-size:13px;font-weight:600;margin-bottom:24px}
  .t-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--blue);animation:t-pulse 2s infinite}
  @keyframes t-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.4)}}
  .t-h1{font-size:52px;font-weight:800;letter-spacing:-0.025em;line-height:1.08;margin-bottom:24px}
  .t-h1 .t-hl{color:var(--blue)}
  .t-hero-sub{font-size:18px;color:var(--gray-500);line-height:1.75;margin-bottom:36px;max-width:480px}
  .t-hero-actions{display:flex;gap:14px;flex-wrap:wrap;align-items:center}
  .t-hero-stats{display:flex;gap:48px;margin-top:56px;padding-top:40px;border-top:1px solid var(--gray-200);flex-wrap:wrap}
  .t-stat-val{font-family:var(--fh);font-size:30px;font-weight:800;color:var(--charcoal);line-height:1}
  .t-stat-lbl{font-size:13px;color:var(--gray-400);margin-top:4px}

  /* DASHBOARD CARD */
  .t-dash-card{background:white;border-radius:20px;box-shadow:0 24px 64px rgba(37,99,235,0.14),0 4px 16px rgba(0,0,0,0.06);overflow:hidden;width:100%;max-width:420px}
  .t-dc-header{background:var(--gray-50);padding:16px 20px;border-bottom:1px solid var(--gray-100);display:flex;align-items:center;justify-content:space-between}
  .t-dc-dots{display:flex;gap:6px}
  .t-dc-dot{width:10px;height:10px;border-radius:50%}
  .t-dc-title{font-size:12px;font-weight:600;color:var(--gray-500)}
  .t-dc-live{background:#DCFCE7;color:#16A34A;font-size:10px;font-weight:700;padding:3px 8px;border-radius:100px}
  .t-dc-body{padding:20px}
  .t-dc-sec-title{font-size:11px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--gray-400);margin-bottom:14px}
  .t-cand-row{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--gray-50)}
  .t-cand-row:last-child{border-bottom:none}
  .t-cand-av{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0}
  .t-cand-info{flex:1;min-width:0}
  .t-cand-name{font-size:13px;font-weight:600;color:var(--charcoal)}
  .t-cand-role{font-size:11px;color:var(--gray-400)}
  .t-cand-score{text-align:right;flex-shrink:0}
  .t-cand-pct{font-size:14px;font-weight:800;font-family:var(--fh)}
  .t-bar-wrap{width:56px;height:4px;background:var(--gray-100);border-radius:2px;margin-top:4px;margin-left:auto}
  .t-bar{height:100%;border-radius:2px}
  .t-dc-footer{background:var(--blue);margin:0 20px 20px;padding:14px 16px;border-radius:12px;display:flex;align-items:center;justify-content:space-between}
  .t-dc-footer-text{font-size:12px;color:rgba(255,255,255,0.8)}
  .t-dc-footer-text strong{color:white;display:block;font-size:14px;font-weight:700}
  .t-dc-chip{background:rgba(255,255,255,0.15);color:white;font-size:11px;font-weight:700;padding:4px 10px;border-radius:8px}
  .t-float-badge{position:absolute;background:white;border-radius:12px;padding:10px 14px;box-shadow:0 8px 24px rgba(0,0,0,0.12);display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:var(--charcoal)}
  .t-fb1{top:-16px;right:-8px}
  .t-fb2{bottom:-8px;left:-16px}
  .t-fb-icon{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center}

  /* TRUST / CLIENT LOGOS */
  .t-trust{background:var(--gray-50);padding:56px 0}
  .t-trust-label{text-align:center;font-size:12px;font-weight:700;color:var(--gray-300);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:28px}
  .t-client-logos{display:flex;justify-content:center;align-items:center;gap:32px;flex-wrap:wrap;margin-bottom:48px}
  .t-client-logo-wrap{width:120px;height:48px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .t-client-logo-img{max-width:120px;max-height:48px;width:auto;height:auto;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:all 0.2s}
  .t-client-logo-img:hover{filter:grayscale(0%);opacity:1}
  .t-client-logo-placeholder{width:120px;height:48px;background:var(--gray-100);border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-size:13px;font-weight:700;color:var(--gray-300);transition:all 0.2s;border:1px dashed var(--gray-200)}
  .t-client-logo-placeholder:hover{color:var(--gray-400);border-color:var(--gray-300)}
  .t-metrics{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--gray-200);border-radius:16px;overflow:hidden;background:var(--gray-200);gap:1px}
  .t-metric{background:white;padding:28px 20px;text-align:center}
  .t-metric-val{font-family:var(--fh);font-size:34px;font-weight:800;color:var(--blue)}
  .t-metric-lbl{font-size:13px;color:var(--gray-500);margin-top:6px}

  /* SECTIONS */
  .t-section{padding:96px 0}
  .t-sec-tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:5px 14px;border-radius:100px;margin-bottom:14px}
  .t-tag-blue{background:var(--blue-50);color:var(--blue)}
  .t-tag-gold{background:var(--gold-bg);color:#8B6914}
  .t-tag-white{background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7)}
  .t-sec-title{font-size:40px;font-weight:800;letter-spacing:-0.02em;margin-bottom:14px}
  .t-sec-sub{font-size:18px;color:var(--gray-500);line-height:1.75;max-width:600px}
  .t-sec-header{text-align:center;margin-bottom:60px}
  .t-sec-header .t-sec-sub{margin:0 auto}
  .t-sec-header .t-sec-title{max-width:700px;margin:0 auto 14px}

  /* SERVICES */
  .t-svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
  .t-svc-card{background:var(--gray-50);border:1px solid var(--gray-100);border-radius:16px;padding:28px;transition:all 0.25s;position:relative;overflow:hidden;cursor:default}
  .t-svc-card:hover{background:white;border-color:var(--blue-100);box-shadow:0 8px 32px rgba(37,99,235,0.1);transform:translateY(-3px)}
  .t-svc-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--blue),var(--indigo));opacity:0;transition:opacity 0.25s}
  .t-svc-card:hover::after{opacity:1}
  .t-svc-icon{width:48px;height:48px;background:var(--blue-50);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:18px}
  .t-svc-icon i{font-size:22px;color:var(--blue)}
  .t-svc-card h3{font-size:15px;font-weight:700;margin-bottom:8px}
  .t-svc-card p{font-size:13px;color:var(--gray-500);line-height:1.65}
  .t-svc-link{display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:600;color:var(--blue);margin-top:14px;opacity:0;transition:opacity 0.2s}
  .t-svc-card:hover .t-svc-link{opacity:1}

  /* ── PROCESS TIMELINE ── */
  .t-process{background:linear-gradient(145deg,#F0F4FF 0%,#EFF6FF 60%,#F8FAFC 100%)}
  .t-timeline{position:relative;margin-top:16px}
  /* Desktop: horizontal connecting line */
  .t-timeline-track{display:flex;gap:0;position:relative;align-items:flex-start}
  .t-timeline-track::before{content:'';position:absolute;top:28px;left:28px;right:28px;height:2px;background:linear-gradient(90deg,var(--blue-100),var(--blue),var(--indigo),var(--blue),var(--blue-100));z-index:0;border-radius:1px}
  .t-tl-step{flex:1;display:flex;flex-direction:column;align-items:center;position:relative;z-index:1;padding:0 8px}
  .t-tl-node{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 0 0 2px var(--blue-100);margin-bottom:16px;flex-shrink:0;position:relative;z-index:2}
  .t-tl-node.ai{box-shadow:0 0 0 2px var(--indigo);background:var(--indigo)}
  .t-tl-node.ai i{color:white}
  .t-tl-node i{font-size:22px}
  .t-tl-day{font-family:var(--fh);font-size:11px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;margin-bottom:6px;text-align:center}
  .t-tl-title{font-size:14px;font-weight:700;color:var(--charcoal);text-align:center;margin-bottom:6px;line-height:1.35}
  .t-tl-desc{font-size:12px;color:var(--gray-500);text-align:center;line-height:1.6}
  .t-tl-ai-pill{display:inline-flex;align-items:center;gap:4px;background:rgba(79,70,229,0.08);color:var(--indigo);font-size:10px;font-weight:700;padding:3px 8px;border-radius:100px;margin-top:6px;border:1px solid rgba(79,70,229,0.15)}
  /* outcome card */
  .t-tl-outcome{background:var(--blue);border-radius:16px;padding:20px 24px;margin-top:40px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}
  .t-tl-outcome-text{font-size:15px;font-weight:700;color:white}
  .t-tl-outcome-sub{font-size:13px;color:rgba(255,255,255,0.7);margin-top:3px}
  .t-tl-outcome-stat{text-align:right}
  .t-tl-outcome-val{font-family:var(--fh);font-size:32px;font-weight:800;color:white;line-height:1}
  .t-tl-outcome-lbl{font-size:12px;color:rgba(255,255,255,0.6);margin-top:3px}
  /* Mobile: vertical stepper */
  @media(max-width:768px){
    .t-timeline-track{flex-direction:column;gap:0;align-items:stretch}
    .t-timeline-track::before{display:none}
    .t-tl-step{flex-direction:row;align-items:flex-start;gap:16px;padding:0 0 28px;text-align:left}
    .t-tl-node{flex-shrink:0;margin-bottom:0;position:relative}
    .t-tl-step:not(:last-child) .t-tl-node::after{content:'';position:absolute;top:56px;left:50%;transform:translateX(-50%);width:2px;height:calc(100% + 28px - 56px);background:var(--blue-100);min-height:28px}
    .t-tl-day,.t-tl-title,.t-tl-desc{text-align:left}
    .t-tl-ai-pill{display:inline-flex}
  }

  /* AI PLATFORM */
  .t-ai{background:var(--charcoal);color:white;overflow:hidden;position:relative}
  .t-ai::before{content:'';position:absolute;top:-200px;left:-200px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,0.12) 0%,transparent 70%);pointer-events:none}
  .t-ai::after{content:'';position:absolute;bottom:-200px;right:-100px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(79,70,229,0.1) 0%,transparent 70%);pointer-events:none}
  .t-ai .t-sec-title{color:white}
  .t-ai .t-sec-sub{color:var(--gray-400)}
  .t-ai-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;position:relative;z-index:1}
  .t-ai-features{display:flex;flex-direction:column;gap:18px;margin-top:36px}
  .t-ai-feat{display:flex;gap:14px;align-items:flex-start;padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);transition:border-color 0.2s}
  .t-ai-feat:hover{border-color:rgba(37,99,235,0.4)}
  .t-ai-feat-icon{width:40px;height:40px;background:rgba(37,99,235,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .t-ai-feat-icon i{font-size:18px;color:#93C5FD}
  .t-ai-feat h4{font-size:14px;font-weight:600;color:white;margin-bottom:3px}
  .t-ai-feat p{font-size:13px;color:var(--gray-500);line-height:1.6}
  .t-ai-mockup{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:24px;backdrop-filter:blur(10px)}
  .t-ai-mok-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06)}
  .t-ai-mok-title{font-family:var(--fh);font-size:14px;font-weight:700;color:white}
  .t-ai-live{background:rgba(16,185,129,0.2);color:#6EE7B7;font-size:11px;font-weight:700;padding:3px 10px;border-radius:100px}
  .t-ai-row{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)}
  .t-ai-row:last-child{border-bottom:none}
  .t-ai-av{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0}
  .t-ai-info{flex:1}
  .t-ai-name{font-size:13px;font-weight:600;color:white}
  .t-ai-skills{display:flex;gap:4px;margin-top:4px;flex-wrap:wrap}
  .t-ai-skill{font-size:10px;font-weight:600;padding:2px 7px;border-radius:4px;background:rgba(255,255,255,0.07);color:var(--gray-400)}
  .t-ai-match{text-align:right;flex-shrink:0}
  .t-ai-pct{font-size:15px;font-weight:800;font-family:var(--fh);color:#6EE7B7}
  .t-ai-bar{width:52px;height:4px;background:rgba(255,255,255,0.08);border-radius:2px;margin-top:6px;margin-left:auto}
  .t-ai-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,#2563EB,#6EE7B7)}
  .t-ai-insights{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.06)}
  .t-ai-ins{background:rgba(255,255,255,0.04);border-radius:10px;padding:12px}
  .t-ai-ins-val{font-family:var(--fh);font-size:22px;font-weight:800;color:white}
  .t-ai-ins-lbl{font-size:11px;color:var(--gray-500);margin-top:2px}

  /* INDUSTRIES */
  .t-ind{background:var(--gray-50)}
  .t-ind-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  .t-ind-card{background:white;border:1px solid var(--gray-100);border-radius:14px;padding:22px 18px;display:flex;align-items:center;gap:14px;transition:all 0.22s;cursor:default}
  .t-ind-card:hover{border-color:var(--blue);box-shadow:0 4px 20px rgba(37,99,235,0.1);transform:translateY(-2px)}
  .t-ind-icon{width:44px;height:44px;border-radius:10px;background:var(--blue-50);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s}
  .t-ind-card:hover .t-ind-icon{background:var(--blue)}
  .t-ind-icon i{font-size:20px;color:var(--blue);transition:color 0.2s}
  .t-ind-card:hover .t-ind-icon i{color:white}
  .t-ind-card h3{font-size:15px;font-weight:700}
  .t-ind-card p{font-size:12px;color:var(--gray-400);margin-top:2px}

  /* WHY */
  .t-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
  .t-why-card{border:1px solid var(--gray-100);border-radius:18px;padding:32px;position:relative;overflow:hidden;transition:all 0.25s;cursor:default}
  .t-why-card:hover{border-color:rgba(37,99,235,0.2);box-shadow:0 12px 40px rgba(37,99,235,0.08);transform:translateY(-3px)}
  .t-why-num{font-family:var(--fh);font-size:52px;font-weight:800;color:var(--blue);opacity:0.08;line-height:1;margin-bottom:14px}
  .t-why-icon{width:52px;height:52px;background:var(--blue-50);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:18px}
  .t-why-icon i{font-size:24px;color:var(--blue)}
  .t-why-card h3{font-size:18px;font-weight:700;margin-bottom:10px}
  .t-why-card p{font-size:14px;color:var(--gray-500);line-height:1.7}
  .t-why-hl{display:inline-flex;align-items:center;gap:5px;background:var(--blue-50);color:var(--blue);font-size:13px;font-weight:700;padding:5px 12px;border-radius:100px;margin-top:16px}

  /* TESTIMONIALS */
  .t-test{background:linear-gradient(145deg,#F0F4FF 0%,#EFF6FF 60%,#F8FAFC 100%)}
  .t-test-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
  .t-test-card{background:white;border-radius:20px;padding:32px;box-shadow:0 4px 24px rgba(0,0,0,0.05);transition:box-shadow 0.2s}
  .t-test-card:hover{box-shadow:0 8px 40px rgba(0,0,0,0.1)}
  .t-stars{display:flex;gap:3px;margin-bottom:18px}
  .t-stars i{font-size:15px;color:var(--gold)}
  .t-quote{font-size:15px;line-height:1.8;color:var(--gray-600);margin-bottom:24px;font-style:italic}
  .t-author{display:flex;align-items:center;gap:12px}
  .t-author-av{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-weight:700;font-size:14px}
  .t-author-name{font-weight:700;font-size:14px}
  .t-author-role{font-size:12px;color:var(--gray-400)}

  /* FAQ */
  .t-faq-layout{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}
  .t-faq-item{border-bottom:1px solid var(--gray-100)}
  .t-faq-q{width:100%;text-align:left;background:none;border:none;padding:18px 0;font-size:15px;font-weight:600;font-family:var(--fb);color:var(--charcoal);cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:14px;transition:color 0.2s}
  .t-faq-q:hover,.t-faq-q.active{color:var(--blue)}
  .t-faq-ans{max-height:0;overflow:hidden;transition:max-height 0.35s ease}
  .t-faq-ans.open{max-height:300px}
  .t-faq-ans-inner{padding:0 0 18px;font-size:14px;color:var(--gray-500);line-height:1.75}
  .t-geo-box{background:var(--gray-50);border:1px solid var(--gray-100);border-radius:18px;padding:32px;position:sticky;top:90px}
  .t-geo-box h3{font-size:20px;font-weight:700;margin-bottom:14px}
  .t-geo-box p{font-size:14px;color:var(--gray-500);line-height:1.8;margin-bottom:12px}
  .t-geo-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
  .t-geo-tag{background:white;border:1px solid var(--gray-200);color:var(--gray-600);font-size:12px;font-weight:500;padding:4px 12px;border-radius:100px}

  /* BLOG */
  .t-blog{background:var(--gray-50)}
  .t-blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
  .t-blog-card{background:white;border-radius:16px;overflow:hidden;border:1px solid var(--gray-100);transition:all 0.25s;cursor:default}
  .t-blog-card:hover{box-shadow:0 12px 40px rgba(0,0,0,0.08);transform:translateY(-3px)}
  .t-blog-thumb{height:175px;display:flex;align-items:center;justify-content:center}
  .t-blog-body{padding:22px}
  .t-blog-cat{font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--blue);margin-bottom:10px}
  .t-blog-card h3{font-size:16px;font-weight:700;line-height:1.45;margin-bottom:10px}
  .t-blog-card p{font-size:13px;color:var(--gray-500);line-height:1.65;margin-bottom:18px}
  .t-blog-meta{display:flex;align-items:center;justify-content:space-between;font-size:12px;color:var(--gray-400)}
  .t-read-more{color:var(--blue);font-weight:600;font-size:12px;display:inline-flex;align-items:center;gap:3px;transition:gap 0.2s}
  .t-blog-card:hover .t-read-more{gap:6px}

  /* CONTACT */
  .t-contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}
  .t-form{display:flex;flex-direction:column;gap:14px}
  .t-form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .t-form-g{display:flex;flex-direction:column;gap:6px}
  .t-form-lbl{font-size:13px;font-weight:600;color:var(--gray-700)}
  .t-form-inp{padding:11px 14px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:14px;font-family:var(--fb);color:var(--charcoal);transition:border-color 0.2s;outline:none;background:white;width:100%}
  .t-form-inp:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,0.08)}
  .t-form-inp:disabled{background:var(--gray-50);cursor:not-allowed;opacity:0.7}
  textarea.t-form-inp{resize:vertical;min-height:110px}
  .t-form-error{font-size:12px;color:var(--red);margin-top:4px}
  .t-social-btn{display:flex;align-items:center;gap:12px;padding:14px 20px;border-radius:12px;font-weight:600;font-size:15px;font-family:var(--fb);cursor:pointer;border:none;transition:all 0.2s;color:white;width:100%}
  .t-wa{background:#25D366}
  .t-wa:hover{background:#1EBE58;transform:translateY(-1px)}
  .t-li{background:#0A66C2}
  .t-li:hover{background:#0958A7;transform:translateY(-1px)}
  .t-social-btn i{font-size:20px}
  .t-contact-det{display:flex;gap:12px;align-items:flex-start;margin-bottom:20px}
  .t-contact-det i{font-size:18px;color:var(--blue);margin-top:2px;flex-shrink:0}
  .t-cd-label{font-size:11px;font-weight:700;color:var(--gray-400);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px}
  .t-cd-val{font-size:15px;color:var(--charcoal);font-weight:500}

  /* FOOTER */
  .t-footer{background:var(--charcoal);color:var(--gray-500);padding:64px 0 28px}
  .t-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:48px}
  .t-footer-tagline{font-size:14px;color:var(--gray-600);line-height:1.75;margin-top:14px;max-width:280px}
  .t-footer-col h4{font-size:12px;font-weight:700;color:white;text-transform:uppercase;letter-spacing:0.09em;margin-bottom:18px}
  .t-footer-links{list-style:none;display:flex;flex-direction:column;gap:10px}
  .t-footer-links a{font-size:14px;color:var(--gray-600);transition:color 0.2s;cursor:pointer}
  .t-footer-links a:hover{color:white}
  .t-footer-bottom{border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}
  .t-footer-copy{font-size:13px}
  .t-fsoc{width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;color:var(--gray-500);transition:all 0.2s;cursor:pointer}
  .t-fsoc:hover{background:rgba(255,255,255,0.1);color:white}
  .t-fsoc i{font-size:16px}

  /* TOAST */
  .t-toast{position:fixed;bottom:24px;right:24px;padding:14px 22px;border-radius:12px;font-size:14px;font-weight:600;box-shadow:0 8px 32px rgba(0,0,0,0.2);z-index:999;display:flex;align-items:center;gap:10px;animation:t-slideUp 0.3s ease}
  .t-toast-success{background:#0F172A;color:white}
  .t-toast-error{background:#FEF2F2;color:#991B1B;border:1px solid #FECACA}
  @keyframes t-slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

  /* MODAL */
  .t-modal-backdrop{position:fixed;inset:0;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);z-index:300;display:flex;align-items:center;justify-content:center;padding:20px;animation:t-fadeIn 0.2s ease}
  @keyframes t-fadeIn{from{opacity:0}to{opacity:1}}
  .t-modal{background:white;border-radius:24px;width:100%;max-width:780px;max-height:88vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 32px 80px rgba(0,0,0,0.2);animation:t-modalIn 0.3s ease}
  @keyframes t-modalIn{from{opacity:0;transform:translateY(32px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
  .t-modal-head{display:flex;align-items:center;justify-content:space-between;padding:24px 32px;border-bottom:1px solid var(--gray-100);flex-shrink:0}
  .t-modal-head h2{font-size:22px;font-weight:800;letter-spacing:-0.01em}
  .t-modal-close{width:36px;height:36px;border-radius:10px;border:none;background:var(--gray-100);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s;color:var(--gray-600)}
  .t-modal-close:hover{background:var(--gray-200)}
  .t-modal-body{padding:32px;overflow-y:auto;flex:1}
  .t-modal-body::-webkit-scrollbar{width:6px}
  .t-modal-body::-webkit-scrollbar-track{background:transparent}
  .t-modal-body::-webkit-scrollbar-thumb{background:var(--gray-200);border-radius:3px}

  /* Team cards */
  .t-team-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
  .t-team-card{border:1px solid var(--gray-100);border-radius:16px;padding:24px;display:flex;gap:16px;align-items:flex-start;transition:border-color 0.2s}
  .t-team-card:hover{border-color:var(--blue-100)}
  .t-team-av{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-weight:800;font-size:16px;flex-shrink:0}
  .t-team-name{font-size:15px;font-weight:700}
  .t-team-title{font-size:12px;font-weight:600;color:var(--blue);margin:2px 0 8px}
  .t-team-bio{font-size:13px;color:var(--gray-500);line-height:1.65}

  /* Careers */
  .t-job-card{border:1px solid var(--gray-100);border-radius:14px;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;transition:all 0.2s;cursor:pointer;margin-bottom:12px}
  .t-job-card:hover{border-color:var(--blue);box-shadow:0 4px 16px rgba(37,99,235,0.08)}
  .t-job-dept{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:var(--blue);margin-bottom:4px}
  .t-job-title{font-size:15px;font-weight:700}
  .t-job-meta{font-size:12px;color:var(--gray-400);margin-top:4px}
  .t-job-badge{background:var(--blue-50);color:var(--blue);font-size:12px;font-weight:600;padding:4px 12px;border-radius:100px;white-space:nowrap}

  /* About / Policy prose */
  .t-prose h3{font-size:17px;font-weight:700;margin:24px 0 10px;color:var(--charcoal)}
  .t-prose h3:first-child{margin-top:0}
  .t-prose p{font-size:14px;color:var(--gray-500);line-height:1.8;margin-bottom:10px}
  .t-prose ul{padding-left:18px;margin-bottom:10px}
  .t-prose ul li{font-size:14px;color:var(--gray-500);line-height:1.8;margin-bottom:4px}
  .t-about-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:24px 0}
  .t-about-stat{background:var(--gray-50);border-radius:12px;padding:18px;text-align:center}
  .t-about-stat-val{font-family:var(--fh);font-size:26px;font-weight:800;color:var(--blue)}
  .t-about-stat-lbl{font-size:12px;color:var(--gray-500);margin-top:4px}

  /* SCROLL ANIMATION */
  .t-fade{opacity:0;transform:translateY(24px);transition:opacity 0.6s ease,transform 0.6s ease}
  .t-fade.visible{opacity:1;transform:translateY(0)}

  /* RESPONSIVE */
  @media(max-width:1100px){.t-svc-grid{grid-template-columns:repeat(2,1fr)}.t-footer-grid{grid-template-columns:1fr 1fr}}
  @media(max-width:900px){.t-hero-grid{grid-template-columns:1fr;gap:40px}.t-h1{font-size:38px}.t-ai-grid{grid-template-columns:1fr}.t-metrics{grid-template-columns:repeat(2,1fr)}.t-why-grid{grid-template-columns:1fr 1fr}.t-test-grid{grid-template-columns:1fr 1fr}.t-faq-layout{grid-template-columns:1fr}.t-contact-grid{grid-template-columns:1fr;gap:40px}.t-ind-grid{grid-template-columns:repeat(2,1fr)}.t-blog-grid{grid-template-columns:1fr 1fr}}
  @media(max-width:640px){.t-h1{font-size:30px}.t-sec-title{font-size:28px}.t-sec-sub{font-size:16px}.t-svc-grid{grid-template-columns:1fr}.t-why-grid{grid-template-columns:1fr}.t-test-grid{grid-template-columns:1fr}.t-blog-grid{grid-template-columns:1fr}.t-ind-grid{grid-template-columns:1fr 1fr}.t-metrics{grid-template-columns:1fr 1fr}.t-footer-grid{grid-template-columns:1fr;gap:28px}.t-form-row{grid-template-columns:1fr}.t-nav-links,.t-nav-cta{display:none!important}.t-hamburger{display:flex!important}.t-hero-visual{display:none!important}.t-section{padding:64px 0!important}.t-hero{padding:64px 0 48px!important}.t-geo-box{position:static}}
  @media(max-width:600px){.t-team-grid{grid-template-columns:1fr}.t-modal{border-radius:16px}.t-modal-body{padding:20px}.t-modal-head{padding:18px 20px}.t-about-stats{grid-template-columns:repeat(3,1fr)}}
`;

/* ─────────────────────────────────────────────
   CLIENT LOGOS
   Add real logo files to /public/images/logos/clients/
   Filename must match the `file` field exactly.
   Component auto-shows image if file exists,
   same-size placeholder if not yet uploaded.
───────────────────────────────────────────── */
const CLIENT_LOGOS = [
  { name: "Bain",    file: "bain.png"        },
  { name: "Duncan",      file: "duncan.png"           },
  { name: "Jaquar",    file: "jaquar.png"         },
  { name: "Noida Airport",  file: "nia.png"       },
  { name: "Toshiba",      file: "toshiba.png"           },
  { name: "Xebia",        file: "xebia.png"   },
  { name: "HDFC Bank",   file: "hdfc.png"        },
  { name: "Merino",        file: "merino.png"             },
];

// Folder path served by Next.js from /public
const LOGO_BASE = "/images/logos/clients/";

type ClientLogoItemProps = {
  name: string;
  file: string;
};

function ClientLogoItem({ name, file }: ClientLogoItemProps) {
  const [hasError, setHasError] = useState(false);
  const src = `${LOGO_BASE}${file}`;

  if (hasError) {
    return (
      <div className="t-client-logo-wrap">
        <div className="t-client-logo-placeholder" title={name}>{name}</div>
      </div>
    );
  }

  return (
    <div className="t-client-logo-wrap">
      <img
        src={src}
        alt={`${name} logo`}
        className="t-client-logo-img"
        onError={() => setHasError(true)}
        width={120}
        height={48}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROCESS TIMELINE DATA
───────────────────────────────────────────── */
const TIMELINE_STEPS = [
  {
    day: "Day 1",
    icon: "clipboard-list",
    title: "Mandate Briefing",
    desc: "Deep-dive JD & culture alignment",
    ai: false,
    color: "#EFF6FF",
    iconColor: "#2563EB",
  },
  {
    day: "Day 2–4",
    icon: "brain",
    title: "AI Sourcing & Screening",
    desc: "500K+ DB · Multi-channel · Match score · Skills · Pre-screening interviews",
    ai: true,
    color: "#EEF2FF",
    iconColor: "#4F46E5",
  },
  {
    day: "Day 5–11",
    icon: "users",
    title: "Client Interviews",
    desc: "Structured rounds · Candidate & HM follow-ups for smooth process",
    ai: false,
    color: "#EFF6FF",
    iconColor: "#2563EB",
  },
  {
    day: "Day 12–13",
    icon: "list-check",
    title: "Selection",
    desc: "Top 2–3 profiles shortlisted with backups ready",
    ai: false,
    color: "#ECFDF5",
    iconColor: "#059669",
  },
  {
    day: "Day 14",
    icon: "trophy",
    title: "Offer & Close",
    desc: "Offer negotiation · Acceptance · Onboarding handoff",
    ai: false,
    color: "#FDF6EC",
    iconColor: "#C8A96B",
  },
];

/* ─────────────────────────────────────────────
   REUSABLE COMPONENTS
───────────────────────────────────────────── */


const Logo = ({ size }: { size?: number }) => {
  const height = size ?? 35;
  const width = Math.round(height * (130 / 35));
  return (
    <div className="t-logo">
      <Image
        src="/images/logo.png"
        alt="Talenti"
        width={width}
        height={height}
        priority
      />
    </div>
  );
};

const Ic = ({ name, style }: { name: string; style?: CSSProperties }) => <i className={`ti ti-${name}`} style={style} aria-hidden="true" />;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SERVICES = [
  { icon: "users",        title: "Permanent Hiring",   desc: "Full-cycle permanent recruitment for mid to senior-level roles across functions with AI-assisted sourcing and screening.", bg: "#EFF6FF", ic: "#2563EB" },
  { icon: "crown",        title: "Executive Search",   desc: "Confidential CXO and VP-level search with deep market mapping, competitor intelligence, and culture-fit assessment.", bg: "#F0F4FF", ic: "#4F46E5" },
  { icon: "code",         title: "IT Recruitment",     desc: "Specialized tech hiring for engineers, architects, data scientists, DevOps, cloud engineers, and emerging tech roles.", bg: "#ECFDF5", ic: "#059669" },
  { icon: "refresh",      title: "RPO Solutions",      desc: "Fully managed recruitment process outsourcing embedded within your organization — scalable, cost-efficient, AI-powered.", bg: "#FDF6EC", ic: "#C8A96B" },
  { icon: "chart-bar",    title: "HR Consulting",      desc: "Strategic HR advisory covering workforce planning, HR redesign, compensation benchmarking, and org development.", bg: "#FFF7ED", ic: "#EA580C" },
  { icon: "brain",        title: "AI Recruitment",     desc: "Deploy our AI resume engine, candidate match scoring, and predictive analytics to transform your talent acquisition.", bg: "#EEF2FF", ic: "#4F46E5" },
  { icon: "map",          title: "Talent Mapping",     desc: "Identify, profile, and track top talent pools before you need to hire — giving you a decisive competitive edge.", bg: "#F0FDFA", ic: "#0D9488" },
  { icon: "star",         title: "Employer Branding",  desc: "Build a magnetic employer brand that attracts top talent organically — EVP development and career site optimization.", bg: "#FEF2F2", ic: "#DC2626" },
];

const AI_FEATURES = [
  { icon: "file-search",      title: "AI Resume Screening",      desc: "Parse and score thousands of CVs in seconds — evaluate skills, experience depth, and role fitment automatically." },
  { icon: "adjustments",      title: "Smart ATS",                desc: "A modern applicant tracking system with intelligent pipeline automation, role-based access, and real-time dashboards." },
  { icon: "chart-dots-3",     title: "Candidate Match Scoring",  desc: "Proprietary engine scores candidates 0–100 against JD requirements, cultural signals, and historical placement data." },
  { icon: "video",            title: "AI Interview Analysis",    desc: "Sentiment analysis, competency scoring, and automated feedback reports for every structured interview conducted." },
  { icon: "report-analytics", title: "Recruitment Analytics",   desc: "Real-time reporting on time-to-hire, cost-per-hire, source effectiveness, pipeline health, and predictive forecasts." },
];

const INDUSTRIES = [
  { icon: "device-laptop",        title: "Information Technology", sub: "Product, SaaS, IT Services" },
  { icon: "building-factory-2",   title: "Manufacturing",          sub: "Auto, Heavy Engineering" },
  { icon: "building-bank",        title: "BFSI",                   sub: "Banking, Finance, Insurance" },
  { icon: "heart-rate-monitor",   title: "Healthcare",             sub: "Pharma, Hospitals, MedTech" },
  { icon: "solar-panel",          title: "Renewable Energy",       sub: "Solar, Wind, Green Tech" },
  { icon: "shopping-bag",         title: "Retail & E-Commerce",    sub: "D2C, Marketplace, FMCG" },
  { icon: "truck",                title: "Logistics & Supply Chain",sub: "3PL, SCM, Last-mile" },
  { icon: "rocket",               title: "Startups & Growth Stage",sub: "Series A–D, VC-backed" },
];

const WHY_ITEMS = [
  { num: "01", icon: "bolt",         title: "60% Faster Hiring",          desc: "Our TalentIQ platform reduces time-to-hire from 45 days (industry avg) to just 14 days — without compromising quality or cultural alignment across all engagement types.", hl: "14-Day Avg. Time-to-Hire", hlIc: "trending-down" },
  { num: "02", icon: "brain",        title: "AI-Enabled Sourcing",        desc: "Multi-channel AI sourcing across LinkedIn, job boards, and our proprietary TalentIQ database of 500K+ pre-screened profiles across India, APAC, Middle East, and Europe.", hl: "500K+ Resume Database", hlIc: "database" },
  { num: "03", icon: "globe",        title: "Global Reach",               desc: "Deep recruitment infrastructure across India and active delivery capability in South East Asia, Middle East, UK, and European countries — with multilingual specialists on ground.", hl: "APAC · ME · Europe", hlIc: "map" },
  { num: "04", icon: "building",     title: "Enterprise-Grade Delivery",  desc: "Dedicated account teams, SLA-driven delivery, weekly reporting dashboards, and seamless HRMS/ATS integration for enterprises of every scale.", hl: "SLA-Guaranteed", hlIc: "shield-check", bg: "#EEF2FF", ic: "#4F46E5" },
  { num: "05", icon: "chart-bar",    title: "Data-Driven Hiring",         desc: "Every decision backed by real-time analytics — pipeline metrics, offer acceptance rates, source quality scores, and predictive headcount forecasting.", hl: "Analytics-First", hlIc: "chart-pie", bg: "#ECFDF5", ic: "#059669" },
  { num: "06", icon: "users-group",  title: "60+ Years Combined Expertise", desc: "Our specialists bring a cumulative 60+ years in leadership, strategic HR, talent acquisition, psychometric assessment, training & development, and management consulting.", hl: "Since 2009", hlIc: "certificate", bg: "#FDF6EC", ic: "#8B6914" },
];

const TESTIMONIALS = [
  { initials: "RK", avBg: "#EFF6FF", avIc: "#2563EB", stars: 5,   quote: '"Talenti reduced our time-to-hire by over 55% for critical technology roles. Their AI matching was uncannily accurate — every shortlisted candidate was interview-ready. It felt like they already knew our culture before we briefed them."', name: "Rakesh Kapoor",    role: "CHRO, Global IT Services Firm" },
  { initials: "AM", avBg: "#FDF6EC", avIc: "#C8A96B", stars: 5,   quote: '"We partnered with Talenti for an executive search mandate to find our VP of Engineering. Within 21 days they delivered 6 exceptional candidates — quality we couldn\'t find in 4 months through other firms. Exceptional."',                  name: "Anita Mehta",      role: "Founder & CEO, Series B FinTech Startup" },
  { initials: "SP", avBg: "#F0F4FF", avIc: "#4F46E5", stars: 4.5, quote: '"Talenti\'s RPO solution scaled our hiring from 20 to 200 positions per month without any drop in quality. The analytics dashboard gave us real-time visibility that transformed how leadership made headcount decisions."',                       name: "Siddharth Patel",  role: "Head of Talent, Large Manufacturing Conglomerate" },
];

const FAQS = [
  { q: "What is AI-powered recruitment and how does Talenti use it?",            a: "AI-powered recruitment uses machine learning to automate resume screening, score candidate-job fitment, analyze interview responses, and predict hiring success. Talenti's engine processes thousands of CVs in seconds, ranks candidates by match score (0–100), and provides explainable insights — reducing manual effort by up to 70% while improving placement quality." },
  { q: "How is Talenti different from traditional HR consulting firms?",          a: "Traditional HR firms rely on manual screening and personal networks. Talenti combines domain expertise with AI tools — a smart ATS, resume match engine, and predictive analytics — delivering 60% faster, more accurate, data-driven hiring. Our average time-to-hire is 14 days vs the industry average of 45+ days." },
  { q: "What industries and roles does Talenti specialize in?",                   a: "Talenti serves 18+ industries including IT, BFSI, manufacturing, healthcare, renewable energy, retail, logistics, and startups. We handle roles from entry-level to CXO across all functions — technology, finance, operations, sales, marketing, and HR with specialist teams per vertical." },
  { q: "How long does the typical hiring process take with Talenti?",             a: "Our average time-to-hire is 14 days for mid-level roles, 21–28 days for senior positions, and 30–45 days for CXO executive search. AI-driven sourcing and screening allows us to present a qualified shortlist within 3–5 business days of receiving a mandate." },
  { q: "What is RPO and is it right for my organization?",                        a: "Recruitment Process Outsourcing (RPO) means Talenti acts as your embedded recruitment team — managing the entire hiring lifecycle. RPO is ideal for companies hiring 50+ roles annually, experiencing rapid growth, or looking to reduce cost-per-hire by 30–40% while improving quality and compliance." },
  { q: "Does Talenti offer HR consulting beyond recruitment?",                    a: "Yes. Our HR consulting practice covers workforce planning, HR process redesign, compensation benchmarking, performance management frameworks, HR technology advisory, and organizational development — partnering with CHROs to build future-ready people functions." },
  { q: "How accurate is Talenti's AI candidate matching system?",                 a: "Our AI match engine achieves 96% accuracy in predicting interview-to-offer conversion when candidates score above 85%. The system is trained on 10,000+ successful placements and continuously improves. Clients see 3x higher interview-to-hire ratios compared to unassisted sourcing." },
  { q: "What is Talenti's placement guarantee and retention rate?",               a: "Talenti offers a 90-day replacement guarantee for permanent placements at no additional cost. Our candidate retention rate is 98% at 12 months post-placement — significantly above the industry average of 78% — testament to our AI-assisted culture-fit precision." },
];

const BLOGS = [
  { bg: "#EFF6FF", ic: "brain",   icColor: "#BFDBFE", cat: "AI & Recruitment",  title: "The Rise of AI in Executive Search: How Machine Intelligence Is Transforming C-Suite Hiring",        desc: "AI tools are reshaping how executive recruiters identify and engage senior leadership candidates.",                                           date: "May 2025 · 8 min read" },
  { bg: "#F0F4FF", ic: "refresh", icColor: "#C7D2FE", cat: "RPO Strategy",      title: "How RPO Is Transforming Enterprise Hiring in India — and Why Now Is the Time to Act",                  desc: "How mid-market Indian companies are using RPO to scale hiring 10x faster while reducing cost.",                                              date: "Apr 2025 · 6 min read" },
  { bg: "#FDF6EC", ic: "star",    icColor: "#FDE68A", cat: "Employer Branding",  title: "Building a Magnetic Employer Brand in the Age of AI: A Practical 2025 Playbook",                       desc: "As AI changes how candidates evaluate employers, your EVP and digital presence have never mattered more.",                                   date: "Mar 2025 · 7 min read" },
];

const TEAM = [
  { init: "KB", bg: "#EFF6FF", ic: "#2563EB", name: "Kunal Bhatia",  title: "Founder & Managing Director",      bio: "With 19+ years in HR and business consulting, Kunal founded Talenti in 2009 with a vision to deliver world-class HR solutions to SMEs and enterprises worldwide. His expertise spans executive search, strategic RPO, L&D, and AI-driven talent acquisition." },
  { init: "RS", bg: "#ECFDF5", ic: "#059669", name: "Rohit Singh",   title: "Co-Founder & Consulting Partner",  bio: "Graduated from Niagara College of Canada and post-graduated from the University of Sydney, Rohit brings 15 years of experience in HR and training. He built a search firm from scratch, innovating business models that help companies save cost and time while hiring the best talent." },
  { init: "SB", bg: "#FDF6EC", ic: "#C8A96B", name: "Shikha Bhatia", title: "Consulting Partner — IT & Europe", bio: "Shikha specialises in technology recruitment for consulting and product development firms, with extensive experience sourcing talent across the UK and European markets. She leads CXO and leadership-level searches for captive centres in India." },
];

const JOBS = [
  { dept: "Recruitment",  title: "Senior Technical Recruiter — IT & Product",  loc: "Delhi / Remote",        type: "Full-time" },
  { dept: "Technology",   title: "Full Stack Developer (Next.js + Supabase)",   loc: "Noida / Hybrid",        type: "Full-time" },
  { dept: "Sales",        title: "Business Development Manager — Enterprise",   loc: "Mumbai / Bangalore",    type: "Full-time" },
  { dept: "Recruitment",  title: "Executive Search Consultant — BFSI",          loc: "Delhi NCR",             type: "Full-time" },
  { dept: "Operations",   title: "RPO Delivery Lead",                            loc: "Hyderabad / Remote",    type: "Full-time" },
];

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
function Modal({ id, onClose }: { id: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const CONTENT = {
    about: {
      title: "About Talenti HR Consulting",
      body: (
        <div className="t-prose">
          <div style={{ background: "linear-gradient(135deg,#EFF6FF,#F0F4FF)", borderRadius: 16, padding: "24px 28px", marginBottom: 24 }}>
            <div className="t-sec-tag t-tag-blue" style={{ marginBottom: 10 }}>Our Story — Since 2009</div>
            <p style={{ fontSize: 16, color: "var(--charcoal)", fontWeight: 500, lineHeight: 1.75, marginBottom: 0 }}>Founded in 2009 by Kunal Bhatia, Talenti HR Consulting Pvt. Ltd. was built on one belief: that every business deserves access to world-class HR expertise.</p>
          </div>
          <div className="t-about-stats">
            {[["2009","Founded"],["15+","Years Active"],["150+","Clients"],["10,000+","Placements"],["500K+","Resume DB"],["60+","Yrs Expertise"]].map(([v,l]) => (
              <div key={l} className="t-about-stat"><div className="t-about-stat-val">{v}</div><div className="t-about-stat-lbl">{l}</div></div>
            ))}
          </div>
          <h3>Who We Are</h3>
          <p>Talenti HR Consulting Pvt. Ltd. is a specialised HR services and consulting firm that partners with small, mid-sized, and enterprise organisations to solve their people challenges.</p>
          <h3>Global Reach</h3>
          <p>Active delivery capability and client relationships across <strong>APAC, Middle East, UK, and European countries</strong>.</p>
          <h3>Our Mission</h3>
          <p>To deliver innovative, reliable, and cost-effective HR solutions that enable our clients to attract, develop, and retain the best talent — in India and globally.</p>
          <h3>Corporate Office</h3>
          <p>Talenti HR Consulting Pvt. Ltd. · 1108, T1,Assotech Business Cresterra, Sector 135, Noida <br />📞 +91-8826319888 &nbsp;·&nbsp; 📧 info@talenti.biz &nbsp;·&nbsp; 🌐 www.talenti.in</p>
        </div>
      ),
    },
    leadership: {
      title: "Leadership Team",
      body: (
        <div>
          <p style={{ fontSize: 14, color: "var(--gray-500)", marginBottom: 24, lineHeight: 1.75 }}>Our founding partners bring a cumulative 60+ years of experience in leadership, strategic HR, and talent acquisition.</p>
          <div className="t-team-grid">
            {TEAM.map(m => (
              <div key={m.init} className="t-team-card">
                <div className="t-team-av" style={{ background: m.bg, color: m.ic }}>{m.init}</div>
                <div><div className="t-team-name">{m.name}</div><div className="t-team-title">{m.title}</div><div className="t-team-bio">{m.bio}</div></div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    careers: {
      title: "Careers at Talenti",
      body: (
        <div>
          <div style={{ background: "linear-gradient(135deg,#EFF6FF,#F0F4FF)", borderRadius: 16, padding: "20px 24px", marginBottom: 28, display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className="ti ti-rocket" style={{ fontSize: 22, color: "white" }} />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--charcoal)", marginBottom: 4 }}>Join the team building India's #1 AI Recruitment Platform</div>
              <div style={{ fontSize: 13, color: "var(--gray-500)" }}>Remote-friendly · Performance culture · Learning & growth stipend</div>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div className="t-sec-tag t-tag-blue" style={{ marginBottom: 14 }}>Open Positions</div>
            {JOBS.map(j => (
              <div key={j.title} className="t-job-card">
                <div><div className="t-job-dept">{j.dept}</div><div className="t-job-title">{j.title}</div><div className="t-job-meta"><i className="ti ti-map-pin" style={{ marginRight: 4 }} />{j.loc} &nbsp;·&nbsp; {j.type}</div></div>
                <div className="t-job-badge">Apply →</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "var(--gray-400)", textAlign: "center" }}>Don't see your role? Email us at <strong style={{ color: "var(--blue)" }}>jobs@talenti.biz</strong></p>
        </div>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      body: (
        <div className="t-prose">
          <p>Last updated: January 2026 &nbsp;|&nbsp; Talenti HR Consulting Pvt. Ltd.</p>
          <h3>1. Information We Collect</h3>
          <p>We collect information you provide directly — including name, email, phone number, company details, and job requirements — when you contact us or submit a form.</p>
          <h3>2. How We Use Your Information</h3>
          <ul><li>To respond to your recruitment or consulting enquiries</li><li>To match candidates to relevant job opportunities with your consent</li><li>To improve our TalentIQ matching algorithms and service quality</li></ul>
          <h3>3. Data Storage & Security</h3>
          <p>All data is stored on secure, encrypted servers in India, compliant with the Information Technology Act, 2000 and Digital Personal Data Protection Act, 2023.</p>
          <h3>4. Contact</h3>
          <p>Email: info@talenti.biz &nbsp;·&nbsp; Web: www.talenti.in</p>
        </div>
      ),
    },
    terms: {
      title: "Terms of Service",
      body: (
        <div className="t-prose">
          <p>Last updated: January 2026 &nbsp;|&nbsp; Talenti HR Consulting Pvt. Ltd.</p>
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing talenti.in or engaging Talenti's services, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
          <h3>2. Services Provided</h3>
          <p>Talenti provides recruitment, executive search, RPO, talent mapping, employer branding, HR outsourcing, and HR consulting services to businesses in India and globally.</p>
          <h3>3. Governing Law</h3>
          <p>These terms are governed by the laws of India. All disputes shall be subject to the exclusive jurisdiction of courts in Delhi / Noida, India.</p>
          <h3>4. Contact</h3>
          <p>info@talenti.biz &nbsp;·&nbsp; +91-8826319888</p>
        </div>
      ),
    },
  };

  const content = CONTENT[id as keyof typeof CONTENT];
  if (!content) return null;

  return (
    <div className="t-modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="t-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="t-modal-head">
          <h2 id="modal-title">{content.title}</h2>
          <button className="t-modal-close" onClick={onClose} aria-label="Close modal"><i className="ti ti-x" style={{ fontSize: 18 }} /></button>
        </div>
        <div className="t-modal-body">{content.body}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO DASHBOARD
───────────────────────────────────────────── */
const HeroDashboard = () => (
  <div className="t-hero-visual" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="t-dash-card">
      <div className="t-dc-header">
        <div className="t-dc-dots">
          <div className="t-dc-dot" style={{ background: "#FF5F57" }} />
          <div className="t-dc-dot" style={{ background: "#FEBC2E" }} />
          <div className="t-dc-dot" style={{ background: "#28C840" }} />
        </div>
        <div className="t-dc-title">TalentIQ — Candidate Match Engine</div>
        <div className="t-dc-live">● LIVE</div>
      </div>
      <div className="t-dc-body">
        <div className="t-dc-sec-title">Top AI-Matched Candidates</div>
        {[
          { init: "AR", bg: "#EFF6FF", ic: "#2563EB", name: "Arjun Rawat",    role: "Senior Backend Engineer · 7 yrs", pct: 96, pctColor: "#16A34A", barGrad: "linear-gradient(90deg,#2563EB,#16A34A)" },
          { init: "PR", bg: "#F0F4FF", ic: "#4F46E5", name: "Priya Rajan",    role: "Product Manager · 5 yrs",         pct: 91, pctColor: "#2563EB", barGrad: "linear-gradient(90deg,#4F46E5,#2563EB)" },
          { init: "VS", bg: "#FDF6EC", ic: "#C8A96B", name: "Vikram Shah",    role: "Engineering Manager · 10 yrs",    pct: 88, pctColor: "#C8A96B", barGrad: "linear-gradient(90deg,#C8A96B,#F59E0B)" },
          { init: "SK", bg: "#FEF2F2", ic: "#DC2626", name: "Sneha Kulkarni", role: "HR Business Partner · 8 yrs",     pct: 84, pctColor: "#64748B", barGrad: "linear-gradient(90deg,#94A3B8,#64748B)" },
        ].map(c => (
          <div className="t-cand-row" key={c.init}>
            <div className="t-cand-av" style={{ background: c.bg, color: c.ic }}>{c.init}</div>
            <div className="t-cand-info"><div className="t-cand-name">{c.name}</div><div className="t-cand-role">{c.role}</div></div>
            <div className="t-cand-score">
              <div className="t-cand-pct" style={{ color: c.pctColor }}>{c.pct}%</div>
              <div className="t-bar-wrap"><div className="t-bar" style={{ width: `${c.pct}%`, background: c.barGrad }} /></div>
            </div>
          </div>
        ))}
      </div>
      <div className="t-dc-footer">
        <div className="t-dc-footer-text"><strong>4 candidates shortlisted</strong>AI analysis complete in 2.3s</div>
        <div className="t-dc-chip">Schedule Interviews →</div>
      </div>
    </div>
    <div className="t-float-badge t-fb1">
      <div className="t-fb-icon" style={{ background: "#DCFCE7" }}><Ic name="bolt" style={{ fontSize: 14, color: "#16A34A" }} /></div>
      <span>60% Faster Hiring</span>
    </div>
    <div className="t-float-badge t-fb2">
      <div className="t-fb-icon" style={{ background: "#EFF6FF" }}><Ic name="brain" style={{ fontSize: 14, color: "#2563EB" }} /></div>
      <span>AI-Powered Matching</span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   AI MOCKUP
───────────────────────────────────────────── */
const AIMockup = () => {
  const candidates = [
    { init: "AK", bg: "rgba(37,99,235,0.3)",   ic: "#93C5FD", name: "Amit Kumar",   skills: ["PySpark","AWS","Kafka"],       pct: 94 },
    { init: "NS", bg: "rgba(79,70,229,0.25)",  ic: "#A5B4FC", name: "Nidhi Sharma", skills: ["Databricks","Python","dbt"],   pct: 89 },
    { init: "RV", bg: "rgba(200,169,107,0.2)", ic: "#C8A96B", name: "Rohan Verma",  skills: ["BigQuery","Airflow"],          pct: 82 },
  ];
  return (
    <div className="t-ai-mockup">
      <div className="t-ai-mok-head">
        <div className="t-ai-mok-title">🧠 TalentIQ — Match Engine v2.4</div>
        <div className="t-ai-live">● Processing</div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#475569", marginBottom: 12 }}>Candidates ranked for: Senior Data Engineer</div>
      {candidates.map(c => (
        <div className="t-ai-row" key={c.init}>
          <div className="t-ai-av" style={{ background: c.bg, color: c.ic }}>{c.init}</div>
          <div className="t-ai-info">
            <div className="t-ai-name">{c.name}</div>
            <div className="t-ai-skills">{c.skills.map(s => <span key={s} className="t-ai-skill">{s}</span>)}</div>
          </div>
          <div className="t-ai-match">
            <div className="t-ai-pct">{c.pct}%</div>
            <div className="t-ai-bar"><div className="t-ai-fill" style={{ width: `${c.pct}%` }} /></div>
          </div>
        </div>
      ))}
      <div className="t-ai-insights">
        {[["2.3s","Screening time"],["147","CVs processed"],["12","Shortlisted"],["96%","Accuracy"]].map(([v,l]) => (
          <div key={l} className="t-ai-ins"><div className="t-ai-ins-val">{v}</div><div className="t-ai-ins-lbl">{l}</div></div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(37,99,235,0.12)", borderRadius: 10, border: "1px solid rgba(37,99,235,0.2)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>AI Insight</div>
        <div style={{ fontSize: 12, color: "#64748B", lineHeight: 1.6 }}>Top 3 candidates show strong alignment with your team's tech stack. Recommend fast-tracking Amit & Nidhi for L1 interviews.</div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   PROCESS TIMELINE SECTION
───────────────────────────────────────────── */
const ProcessTimeline = ({ scrollTo }: { scrollTo: (id: string) => void }) => (
  <section id="process" className="t-section t-process" aria-labelledby="process-h">
    <div className="t-container">
      <div className="t-sec-header">
        <div className="t-sec-tag t-tag-blue">Our Process</div>
        <h2 className="t-sec-title" id="process-h">From Brief to Hire in 14 Days</h2>
        <p className="t-sec-sub">Our AI-powered process delivers a qualified shortlist in days, not weeks — every time.</p>
      </div>

      <div className="t-timeline">
        <div className="t-timeline-track">
          {TIMELINE_STEPS.map((step) => (
            <div className="t-tl-step t-fade" key={step.day}>
              <div
                className={`t-tl-node${step.ai ? " ai" : ""}`}
                style={!step.ai ? { background: step.color } : undefined}
              >
                <Ic name={step.icon} style={{ fontSize: 22, color: step.ai ? "white" : step.iconColor }} />
              </div>
              <div>
                <div className="t-tl-day" style={{ color: step.ai ? "var(--indigo)" : "var(--blue)" }}>{step.day}</div>
                <div className="t-tl-title">{step.title}</div>
                <div className="t-tl-desc">{step.desc}</div>
                {step.ai && <div className="t-tl-ai-pill"><Ic name="sparkles" style={{ fontSize: 10 }} /> AI-powered</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Outcome bar */}
        <div className="t-tl-outcome t-fade">
          <div>
            <div className="t-tl-outcome-text">Offer accepted. Talent secured.</div>
            <div className="t-tl-outcome-sub">End-to-end managed process with dedicated account team · 90-day replacement guarantee included</div>
          </div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
            <div className="t-tl-outcome-stat">
              <div className="t-tl-outcome-val">90%</div>
              <div className="t-tl-outcome-lbl">Offer acceptance ratio</div>
            </div>
            <div className="t-tl-outcome-stat">
              <div className="t-tl-outcome-val">98%</div>
              <div className="t-tl-outcome-lbl">Retention at 12 months</div>
            </div>
            <button
              onClick={() => scrollTo("contact")}
              className="t-btn"
              style={{ background: "white", color: "var(--blue)", fontWeight: 700, padding: "12px 24px", borderRadius: 10, fontSize: 14 }}
            >
              Start Your 14-Day Hire <Ic name="arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function TalentiWebsite() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeFaq, setActiveFaq]     = useState<number | null>(null);
  const [toast, setToast]             = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [modal, setModal]             = useState<string | null>(null);
  const [countersRun, setCountersRun] = useState(false);
  const statsRef = useRef(null);

  // ── Form state ──
  const [form, setForm]           = useState({ name: "", company: "", email: "", phone: "", service: "", message: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError]     = useState("");

  const openModal  = useCallback((id: string) => setModal(id), []);
  const closeModal = useCallback(() => setModal(null), []);

  /* Load external CSS */
  useEffect(() => {
    const hrefs = [
      "https://cdn.jsdelivr.net/npm/@fontsource/sora@5.0.17/400.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/sora@5.0.17/600.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/sora@5.0.17/700.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/sora@5.0.17/800.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.17/400.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.17/500.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.17/600.css",
      "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.0.0/dist/tabler-icons.min.css",
    ];
    hrefs.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const el = document.createElement("link");
        el.rel = "stylesheet"; el.href = href;
        document.head.appendChild(el);
      }
    });
  }, []);

  /* Body scroll lock for mobile nav */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Scroll-triggered fade-in */
  useEffect(() => {
    const els = document.querySelectorAll(".t-fade");
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) { setTimeout(() => e.target.classList.add("visible"), i * 60); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  /* Counter animation */
  useEffect(() => {
    if (!statsRef.current || countersRun) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setCountersRun(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [countersRun]);

  /* ── Contact form submit ── */
  const handleInput  = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value })), []);
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    if (!form.name || !form.company || !form.email) {
      setFormError("Please fill in your name, company, and email.");
      return;
    }

    setFormLoading(true);
    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Something went wrong. Please try again.");
        setToast({ message: "❌ Failed to send. Please try again.", type: "error" });
      } else {
        setToast({ message: "✅ Enquiry sent! We'll respond within 4 hours.", type: "success" });
        setForm({ name: "", company: "", email: "", phone: "", service: "", message: "" });
      }
    } catch (_err: unknown) {
      setFormError("Network error. Please check your connection and try again.");
      setToast({ message: "❌ Network error. Please try again.", type: "error" });
    } finally {
      setFormLoading(false);
      setTimeout(() => setToast(null), 5000);
    }
  }, [form]);

  const toggleFaq = useCallback((i: number) => setActiveFaq(v => v === i ? null : i), []);

  /* Animated counter */
  const Counter = ({ val, suffix }: { val: string | number; suffix: string }) => {
    const [display, setDisplay] = useState("0");
    useEffect(() => {
      if (!countersRun) return;
      const num = parseFloat(String(val));
      const dur = 1200, start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const cur  = num * ease;
        setDisplay((Number.isInteger(num) ? Math.round(cur).toLocaleString("en-IN") : cur.toFixed(0)) + suffix);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, [countersRun, val, suffix]);
    return <span>{countersRun ? display : "0" + suffix}</span>;
  };

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* ── MOBILE NAV ── */}
      {mobileOpen && (
        <nav className="t-mobile-nav open" role="dialog" aria-label="Mobile navigation">
          <div className="t-mob-head">
            <Logo />
            <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: "var(--charcoal)", padding: 4 }}>
              <Ic name="x" />
            </button>
          </div>
          <div className="t-mob-links">
            {["services","process","ai-platform","industries","why-talenti","blog","contact"].map(id => (
              <a key={id} onClick={() => scrollTo(id)} style={{ textTransform: "capitalize" }}>{id.replace("-"," ")}</a>
            ))}
          </div>
          <div className="t-mob-footer">
            <button onClick={() => scrollTo("contact")} className="t-btn t-btn-primary t-btn-lg" style={{ width: "100%", justifyContent: "center" }}>
              <Ic name="calendar-plus" /> Book Consultation
            </button>
          </div>
        </nav>
      )}

      {/* ── NAV ── */}
      <nav className="t-nav" role="navigation" aria-label="Main navigation">
        <div className="t-container">
          <div className="t-nav-inner">
            <Logo />
            <ul className="t-nav-links">
              {[["services","Services"],["process","Process"],["ai-platform","AI Platform"],["industries","Industries"],["why-talenti","Why Talenti"],["blog","Insights"],["contact","Contact"]].map(([id,label]) => (
                <li key={id}><a onClick={() => scrollTo(id)}>{label}</a></li>
              ))}
            </ul>
            <div className="t-nav-cta">
              <a href="tel:+918826319888" className="t-btn t-btn-outline">+91-8826319888</a>
              <button onClick={() => scrollTo("contact")} className="t-btn t-btn-primary"><Ic name="calendar-plus" /> Book Consultation</button>
            </div>
            <button className="t-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="t-hero" id="hero">
        <div className="t-container">
          <div className="t-hero-grid">
            <div>
              <div className="t-badge"><span className="t-badge-dot" />India's AI-First HR Consulting Platform — Since 2009</div>
              <h1 className="t-h1">Empowering Businesses Through <span className="t-hl">Smart HR Solutions</span> &amp; AI Innovation</h1>
              <p className="t-hero-sub">Since 2009, Talenti has been the trusted HR partner for SMEs and enterprises across India and globally — delivering expert recruitment, HR outsourcing, and strategic talent management powered by our TalentIQ platform.</p>
              <div className="t-hero-actions">
                <button onClick={() => scrollTo("contact")} className="t-btn t-btn-primary t-btn-xl"><Ic name="calendar-plus" /> Book Consultation</button>
                <button onClick={() => scrollTo("services")} className="t-btn t-btn-outline t-btn-xl">Explore Services <Ic name="arrow-right" /></button>
              </div>
              <div className="t-hero-stats" ref={statsRef}>
                {[["10000","+","Placements Made"],["150","+","Enterprise Clients"],["98","%","Retention Rate"],["14","+","Days Avg. Hire"]].map(([val,suf,lbl]) => (
                  <div key={lbl}>
                    <div className="t-stat-val"><Counter val={parseInt(val)} suffix={suf} /></div>
                    <div className="t-stat-lbl">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            <HeroDashboard />
          </div>
        </div>
      </header>

      {/* ── TRUST / CLIENT LOGOS ── */}
      <section className="t-trust" aria-label="Client trust indicators">
        <div className="t-container">
          <p className="t-trust-label">Trusted by 150+ companies across India, APAC, Middle East &amp; Europe</p>
          {/*
            DROP your logo files into:
              public/images/logos/clients/toshiba.png
              public/images/logos/clients/wipro.png
              ... (see CLIENT_LOGOS array above for all filenames)
            Placeholders show automatically until files are present.
          */}
          <div className="t-client-logos">
            {CLIENT_LOGOS.map(logo => (
              <ClientLogoItem key={logo.name} name={logo.name} file={logo.file} />
            ))}
          </div>
          <div className="t-metrics">
            {[["10,000+","Successful Placements"],["14 Days","Avg. Time-to-Hire"],["98%","Candidate Retention"],["500K+","Resume Database"]].map(([v,l]) => (
              <div key={l} className="t-metric t-fade"><div className="t-metric-val">{v}</div><div className="t-metric-lbl">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="t-section" style={{ background: "white" }} aria-labelledby="svc-h">
        <div className="t-container">
          <div className="t-sec-header">
            <div className="t-sec-tag t-tag-blue">Our Services</div>
            <h2 className="t-sec-title" id="svc-h">End-to-End Recruitment &amp; HR Solutions</h2>
            <p className="t-sec-sub">From entry-level staffing to C-suite executive search — we cover the full spectrum of talent acquisition and HR transformation.</p>
          </div>
          <div className="t-svc-grid">
            {SERVICES.map(s => (
              <article key={s.title} className="t-svc-card t-fade">
                <div className="t-svc-icon" style={{ background: s.bg }}><i className={`ti ti-${s.icon}`} style={{ fontSize: 22, color: s.ic }} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="t-svc-link">Learn more <Ic name="arrow-right" /></span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS TIMELINE ── */}
      <ProcessTimeline scrollTo={scrollTo} />

      {/* ── AI PLATFORM ── */}
      <section id="ai-platform" className="t-section t-ai" aria-labelledby="ai-h">
        <div className="t-container">
          <div className="t-ai-grid">
            <div>
              <div className="t-sec-tag t-tag-white">TalentIQ Platform</div>
              <h2 className="t-sec-title" id="ai-h">Recruitment Powered by <span style={{ color: "#93C5FD" }}>TalentIQ</span></h2>
              <p className="t-sec-sub">Our proprietary TalentIQ recruitment platform eliminates bias, accelerates screening, and surfaces the highest-quality candidates — at enterprise scale.</p>
              <div className="t-ai-features">
                {AI_FEATURES.map(f => (
                  <div key={f.title} className="t-ai-feat t-fade">
                    <div className="t-ai-feat-icon"><Ic name={f.icon} style={{ fontSize: 18, color: "#93C5FD" }} /></div>
                    <div><h4>{f.title}</h4><p>{f.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <AIMockup />
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" className="t-section t-ind" aria-labelledby="ind-h">
        <div className="t-container">
          <div className="t-sec-header">
            <div className="t-sec-tag t-tag-blue">Industries We Serve</div>
            <h2 className="t-sec-title" id="ind-h">Deep Domain Expertise Across Sectors</h2>
            <p className="t-sec-sub">Specialist recruiters with industry-specific knowledge ensuring culture-fit and domain-relevant placements in every engagement.</p>
          </div>
          <div className="t-ind-grid">
            {INDUSTRIES.map(ind => (
              <article key={ind.title} className="t-ind-card t-fade">
                <div className="t-ind-icon"><Ic name={ind.icon} style={{ fontSize: 20, color: "var(--blue)" }} /></div>
                <div><h3>{ind.title}</h3><p>{ind.sub}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY TALENTI ── */}
      <section id="why-talenti" className="t-section" style={{ background: "white" }} aria-labelledby="why-h">
        <div className="t-container">
          <div className="t-sec-header">
            <div className="t-sec-tag t-tag-gold">Why Choose Talenti</div>
            <h2 className="t-sec-title" id="why-h">The Talenti Advantage</h2>
            <p className="t-sec-sub">We are not a traditional recruitment firm. We are a talent intelligence company built for the age of AI and enterprise hiring at scale.</p>
          </div>
          <div className="t-why-grid">
            {WHY_ITEMS.map(w => (
              <article key={w.num} className="t-why-card t-fade">
                <div className="t-why-num">{w.num}</div>
                <div className="t-why-icon" style={{ background: w.bg || "var(--blue-50)" }}>
                  <Ic name={w.icon} style={{ fontSize: 24, color: w.ic || "var(--blue)" }} />
                </div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <span className="t-why-hl" style={{ background: w.bg || "var(--blue-50)", color: w.ic || "var(--blue)" }}>
                  <Ic name={w.hlIc} style={{ fontSize: 13 }} /> {w.hl}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="t-section t-test" aria-labelledby="test-h">
        <div className="t-container">
          <div className="t-sec-header">
            <div className="t-sec-tag t-tag-blue">Client Testimonials</div>
            <h2 className="t-sec-title" id="test-h">What Our Clients Say</h2>
            <p className="t-sec-sub">Hear from HR leaders and business heads who transformed their talent acquisition with Talenti.</p>
          </div>
          <div className="t-test-grid">
            {TESTIMONIALS.map(t => (
              <article key={t.initials} className="t-test-card t-fade">
                <div className="t-stars">
                  {Array.from({ length: 5 }).map((_,i) => (
                    <Ic key={i} name={i < Math.floor(t.stars) ? "star-filled" : t.stars % 1 ? "star-half-filled" : "star"} style={{ fontSize: 15, color: "var(--gold)" }} />
                  ))}
                </div>
                <p className="t-quote">{t.quote}</p>
                <div className="t-author">
                  <div className="t-author-av" style={{ background: t.avBg, color: t.avIc }}>{t.initials}</div>
                  <div><div className="t-author-name">{t.name}</div><div className="t-author-role">{t.role}</div></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ + GEO ── */}
      <section id="faq" className="t-section" style={{ background: "white" }} aria-labelledby="faq-h">
        <div className="t-container">
          <div className="t-sec-header" style={{ marginBottom: 48 }}>
            <div className="t-sec-tag t-tag-blue">FAQ &amp; Insights</div>
            <h2 className="t-sec-title" id="faq-h">Frequently Asked Questions</h2>
            <p className="t-sec-sub">Answers to common questions about AI recruitment, HR consulting, and how Talenti works.</p>
          </div>
          <div className="t-faq-layout">
            <div itemScope itemType="https://schema.org/FAQPage">
              {FAQS.map((f,i) => (
                <div key={i} className="t-faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <button className={`t-faq-q${activeFaq === i ? " active" : ""}`} onClick={() => toggleFaq(i)} aria-expanded={activeFaq === i} itemProp="name">
                    {f.q}
                    <Ic name="plus" style={{ fontSize: 18, flexShrink: 0, transition: "transform 0.25s", color: activeFaq === i ? "var(--blue)" : "var(--gray-400)", transform: activeFaq === i ? "rotate(45deg)" : "none" }} />
                  </button>
                  <div className={`t-faq-ans${activeFaq === i ? " open" : ""}`} role="region" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <div className="t-faq-ans-inner" itemProp="text">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="t-geo-box">
              <div className="t-sec-tag t-tag-blue" style={{ marginBottom: 14 }}>AI Recruitment Insights</div>
              <h3>The Future of Hiring is AI-First</h3>
              <p>India's recruitment market is undergoing fundamental transformation. By 2026, over 70% of enterprise hiring decisions will involve AI assistance at some stage of the pipeline.</p>
              <p>Talenti HR Consulting Pvt Ltd is at the forefront of this shift, combining human judgment with AI to deliver recruitment outcomes that neither could achieve alone.</p>
              <div className="t-geo-tags">
                {["AI Recruitment India","Executive Search","HR Consulting","IT Staffing","RPO Services","Talent Mapping","Employer Branding","PAN India Hiring","BFSI Recruitment","CXO Search","Smart ATS","Candidate Matching"].map(t => (
                  <span key={t} className="t-geo-tag">{t}</span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section id="blog" className="t-section t-blog" aria-labelledby="blog-h">
        <div className="t-container">
          <div className="t-sec-header">
            <div className="t-sec-tag t-tag-blue">Insights &amp; Research</div>
            <h2 className="t-sec-title" id="blog-h">Talent Intelligence Blog</h2>
            <p className="t-sec-sub">Expert perspectives on AI recruitment, workforce strategy, and the future of HR in India.</p>
          </div>
          <div className="t-blog-grid">
            {BLOGS.map(b => (
              <article key={b.title} className="t-blog-card t-fade">
                <div className="t-blog-thumb" style={{ background: b.bg }}><Ic name={b.ic} style={{ fontSize: 48, color: b.icColor }} /></div>
                <div className="t-blog-body">
                  <div className="t-blog-cat">{b.cat}</div>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                  <div className="t-blog-meta">
                    <span>{b.date}</span>
                    <span className="t-read-more">Read more <Ic name="arrow-right" style={{ fontSize: 12 }} /></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button className="t-btn t-btn-outline t-btn-lg">View All Articles <Ic name="arrow-right" /></button>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="t-section" style={{ background: "white" }} aria-labelledby="contact-h">
        <div className="t-container">
          <div className="t-contact-grid">
            <div>
              <div className="t-sec-tag t-tag-blue" style={{ marginBottom: 12 }}>Get in Touch</div>
              <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8 }} id="contact-h">Book a Free Consultation</h2>
              <p style={{ fontSize: 15, color: "var(--gray-500)", marginBottom: 28 }}>Tell us about your hiring needs and a talent specialist will respond within 24 hours.</p>
              <form className="t-form" onSubmit={handleSubmit} noValidate>
                <div className="t-form-row">
                  <div className="t-form-g">
                    <label className="t-form-lbl" htmlFor="name">Full Name *</label>
                    <input className="t-form-inp" id="name" name="name" type="text" placeholder="Rahul Sharma" value={form.name} onChange={handleInput} required disabled={formLoading} />
                  </div>
                  <div className="t-form-g">
                    <label className="t-form-lbl" htmlFor="company">Company *</label>
                    <input className="t-form-inp" id="company" name="company" type="text" placeholder="Acme Corp" value={form.company} onChange={handleInput} required disabled={formLoading} />
                  </div>
                </div>
                <div className="t-form-row">
                  <div className="t-form-g">
                    <label className="t-form-lbl" htmlFor="email">Work Email *</label>
                    <input className="t-form-inp" id="email" name="email" type="email" placeholder="rahul@acmecorp.com" value={form.email} onChange={handleInput} required disabled={formLoading} />
                  </div>
                  <div className="t-form-g">
                    <label className="t-form-lbl" htmlFor="phone">Phone Number</label>
                    <input className="t-form-inp" id="phone" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleInput} disabled={formLoading} />
                  </div>
                </div>
                <div className="t-form-g">
                  <label className="t-form-lbl" htmlFor="service">Service Required</label>
                  <select className="t-form-inp" id="service" name="service" value={form.service} onChange={handleInput} disabled={formLoading}>
                    <option value="">Select a service...</option>
                    {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div className="t-form-g">
                  <label className="t-form-lbl" htmlFor="message">Requirements</label>
                  <textarea className="t-form-inp" id="message" name="message" placeholder="E.g. We need 10 senior engineers in Bangalore over the next quarter..." value={form.message} onChange={handleInput} disabled={formLoading} />
                </div>
                {formError && <p className="t-form-error"><Ic name="alert-circle" style={{ fontSize: 13, marginRight: 4 }} />{formError}</p>}
                <button
                  type="submit"
                  className="t-btn t-btn-primary"
                  style={{ padding: "14px 28px", fontSize: 15, justifyContent: "center", opacity: formLoading ? 0.7 : 1 }}
                  disabled={formLoading}
                >
                  {formLoading
                    ? <><Ic name="loader-2" style={{ fontSize: 16, animation: "spin 1s linear infinite" }} /> Sending...</>
                    : <><Ic name="send" /> Send Enquiry</>
                  }
                </button>
                <p style={{ fontSize: 12, color: "var(--gray-400)" }}>We typically respond within 4 business hours.</p>
              </form>
            </div>

            {/* Contact Info */}
            <div style={{ paddingTop: 8 }}>
              <div className="t-sec-tag t-tag-gold" style={{ marginBottom: 20 }}>Contact Details</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>We're here to help you hire better</h3>
              {[
                { icon: "mail",    label: "Email Us",      val: "info@talenti.biz" },
                { icon: "phone",   label: "Call Us",       val: "+91-8826319888" },
                { icon: "map-pin", label: "Headquarters",  val: "1108, T1, Assotech Business Cresterra, Sector 135, Noida, India", sub: "Pan-India · APAC · Middle East · Europe" },
                { icon: "clock",   label: "Working Hours", val: "Mon – Sat · 9:00 AM – 7:00 PM IST" },
              ].map(c => (
                <div key={c.label} className="t-contact-det">
                  <Ic name={c.icon} style={{ fontSize: 18, color: "var(--blue)", marginTop: 2 }} />
                  <div>
                    <div className="t-cd-label">{c.label}</div>
                    <div className="t-cd-val">{c.val}{c.sub && <><br /><span style={{ fontSize: 13, color: "var(--gray-400)" }}>{c.sub}</span></>}</div>
                  </div>
                </div>
              ))}
              <div style={{ height: 1, background: "var(--gray-100)", margin: "24px 0" }} />
              <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Connect directly via:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button className="t-social-btn t-wa" onClick={() => window.open("https://wa.me/918826319888","_blank")}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Chat on WhatsApp
                </button>
                <button className="t-social-btn t-li" onClick={() => window.open("https://www.linkedin.com/company/talenti-hr-consulting-pvt--ltd-/","_blank")}>
                  <Ic name="brand-linkedin" style={{ fontSize: 20 }} /> Connect on LinkedIn
                </button>
              </div>
              <div style={{ marginTop: 24, padding: "18px", background: "var(--blue-50)", borderRadius: 12, border: "1px solid var(--blue-100)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <Ic name="clock-check" style={{ fontSize: 18, color: "var(--blue)" }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)" }}>Our Response Commitment</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--gray-500)", lineHeight: 1.65 }}>
                  We respond to all enquiries within <strong style={{ color: "var(--blue)" }}>4 business hours</strong>. For urgent mandates, WhatsApp us for a same-day response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="t-footer" role="contentinfo">
        <div className="t-container">
          <div className="t-footer-grid">
            <div>
              <Logo size={32} />
              <p className="t-footer-tagline">Your trusted HR outsourcing and talent management partner since 2009 — delivering expert recruitment, RPO, and strategic HR solutions across India, APAC, Middle East &amp; Europe.</p>
              <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", animation: "t-pulse 2s infinite" }} />
                <span style={{ fontSize: 13, color: "var(--gray-600)" }}>Actively recruiting — India · APAC · ME · Europe</span>
              </div>
            </div>
            {[
              { heading: "Services", links: [
                { label: "Permanent Hiring",  action: () => scrollTo("services") },
                { label: "Executive Search",  action: () => scrollTo("services") },
                { label: "IT Recruitment",    action: () => scrollTo("services") },
                { label: "RPO Solutions",     action: () => scrollTo("services") },
                { label: "HR Consulting",     action: () => scrollTo("services") },
                { label: "Talent Mapping",    action: () => scrollTo("services") },
              ]},
              { heading: "Company", links: [
                { label: "About Us",          action: () => openModal("about") },
                { label: "Leadership Team",   action: () => openModal("leadership") },
                { label: "Why Talenti",       action: () => scrollTo("why-talenti") },
                { label: "Our Process",       action: () => scrollTo("process") },
                { label: "Insights Blog",     action: () => scrollTo("blog") },
                { label: "Careers",           action: () => openModal("careers") },
              ]},
              { heading: "Connect", links: [
                { label: "Contact Us",        action: () => scrollTo("contact") },
                { label: "info@talenti.biz",  action: () => window.location.href = "mailto:info@talenti.biz" },
                { label: "Privacy Policy",    action: () => openModal("privacy") },
                { label: "Terms of Service",  action: () => openModal("terms") },
              ]},
            ].map(col => (
              <div key={col.heading} className="t-footer-col">
                <h4>{col.heading}</h4>
                <ul className="t-footer-links">
                  {col.links.map(l => <li key={l.label}><a onClick={l.action} style={{ cursor: "pointer" }}>{l.label}</a></li>)}
                </ul>
                {col.heading === "Connect" && (
                  <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                    {[
                      { icon: "brand-linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/talenti-hr-consulting-pvt--ltd-/" },
                      { icon: "brand-facebook", label: "Facebook", url: "https://www.facebook.com/talentijobs/" },
                    ].map(({ icon, label, url }) => (
                      <div key={icon} className="t-fsoc" role="button" aria-label={label} onClick={() => window.open(url,"_blank","noopener")} style={{ cursor: "pointer" }}>
                        <Ic name={icon} style={{ fontSize: 16 }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="t-footer-bottom">
            <p className="t-footer-copy">© 2026 Talenti HR Consulting Pvt. Ltd. All rights reserved. &nbsp;·&nbsp; www.talenti.in</p>
            <p className="t-footer-copy" style={{ color: "var(--gray-600)" }}>Est. 2009 · India · APAC · Middle East · Europe</p>
          </div>
        </div>
      </footer>

      {/* ── MODAL ── */}
      {modal && <Modal id={modal} onClose={closeModal} />}

      {/* ── TOAST ── */}
      {toast && (
        <div className={`t-toast t-toast-${toast?.type}`}>
          <Ic name={toast?.type === "success" ? "circle-check" : "alert-circle"} style={{ fontSize: 18, color: toast?.type === "success" ? "#22C55E" : "#DC2626" }} />
          <span>{toast?.message}</span>
        </div>
      )}

      {/* Spinner keyframe */}
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </>
  );
}