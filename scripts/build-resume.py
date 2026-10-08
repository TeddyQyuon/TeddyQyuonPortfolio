"""Rebuild the public resume from verified portfolio and coursework information.
Requires ReportLab. Run from the repository root: python scripts/build-resume.py
"""
from pathlib import Path
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont("ResumeSans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("ResumeSans-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFontFamily("ResumeSans", normal="ResumeSans", bold="ResumeSans-Bold")
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/resume/Wai_Yan_Hpone_Lat_Resume.pdf'
ink, muted, blue = '#15263a', '#4d5e70', '#245b83'
styles = {
 'name': ParagraphStyle('name', fontName='ResumeSans-Bold', fontSize=23, leading=27, textColor=colors.HexColor(ink), spaceAfter=6),
 'role': ParagraphStyle('role', fontName='ResumeSans-Bold', fontSize=10, leading=14, textColor=colors.HexColor(blue), spaceAfter=8),
 'contact': ParagraphStyle('contact', fontName='ResumeSans', fontSize=8.3, leading=13, textColor=colors.HexColor(muted), spaceAfter=10),
 'section': ParagraphStyle('section', fontName='ResumeSans-Bold', fontSize=10.5, leading=15, textColor=colors.HexColor(blue), spaceBefore=10, spaceAfter=6, keepWithNext=True),
 'title': ParagraphStyle('title', fontName='ResumeSans-Bold', fontSize=10.1, leading=14, textColor=colors.HexColor(ink), spaceBefore=6, spaceAfter=3, keepWithNext=True),
 'body': ParagraphStyle('body', fontName='ResumeSans', fontSize=9, leading=12.5, textColor=colors.HexColor(ink), spaceAfter=5),
 'meta': ParagraphStyle('meta', fontName='ResumeSans', fontSize=8.3, leading=12, textColor=colors.HexColor(muted), spaceAfter=3, keepWithNext=True),
}
story=[]
def add(text, kind='body'): story.append(Paragraph(text, styles[kind]))
def project(title, stack, text):
 add(title,'title');add(stack,'meta');add(text)
def footer(canvas, doc):
 canvas.setStrokeColor(colors.HexColor('#dce4eb'));canvas.line(42,39,A4[0]-42,39)
 canvas.setFont('ResumeSans',8);canvas.setFillColor(colors.HexColor(muted));canvas.drawString(42,25,'Wai Yan Hpone Lat | teddy-qyuon-portfolio.vercel.app');canvas.drawRightString(A4[0]-42,25,str(doc.page))
add('WAI YAN HPONE LAT','name')
add('APPLIED AI &amp; ANALYTICS STUDENT | SOFTWARE &amp; DATA INTERNSHIP CANDIDATE','role')
add('Singapore | +65 9897 4250 | waiyanhponelat.eduvalor.2024g@gmail.com<br/>'
    '<link href="https://teddy-qyuon-portfolio.vercel.app/">teddy-qyuon-portfolio.vercel.app</link> | '
    '<link href="https://github.com/TeddyQyuon">github.com/TeddyQyuon</link> | '
    '<link href="https://www.linkedin.com/in/waiyanhponelat">linkedin.com/in/waiyanhponelat</link>','contact')
add('PROFILE','section')
add('Year 2 Applied AI &amp; Analytics student at Nanyang Polytechnic. Builds React applications, Python and Node.js APIs, and data workflows. Personal projects are developed with AI assistance, code review and test verification. Seeking software engineering, full-stack development or data/analytics internship opportunities.')
add('<b>Internship availability:</b> 29 March 2027 - 28 January 2028 (44 weeks). <b>Expected graduation:</b> May 2028.')
add('EDUCATION','section')
add('Nanyang Polytechnic | Diploma in Applied AI &amp; Analytics | 2025 - 2028','title')
add('Current cumulative GPA: 3.18. Coursework: Full Stack Application Development, Data Wrangling, Predictive Analytics &amp; Forecasting, Data Structures &amp; Algorithms, Responsible AI for Sustainability, UX Design, Database Design &amp; Administration and AI &amp; Data Analytics.')
add('Mandalay Technological University (COE) | Computer Engineering &amp; IT Studies | 2019 - 2020','title')
add('Completed 1 year and 1 semester. Studies interrupted following COVID-19 disruption and subsequent instability in Myanmar.')
add('Myanmar Matriculation Examination | 2018 / 2019','title')
add('487 / 600 marks; 5 distinctions in Myanmar, Mathematics, Chemistry, Physics and Biology.')
add('SELECTED PERSONAL PROJECTS','section')
add('Project direction, implementation and release checks with AI assistance. Detailed evidence and current limitations are available in the linked portfolio.','meta')
project('SOLE DISTRICT - Streetwear Commerce Platform','React | Django | PostgreSQL | Stripe | Vercel',
 'Built an editorial storefront and Django commerce workflows with SKU stock, customer recovery and protected merchant tools. Deployed storefront/API; catalogue and imagery are illustrative. Payments remain disabled; owner credentials and email delivery need setup.')
project('SCENTHAUS Intelligence - Fragrance Discovery &amp; ML','React | FastAPI | PostgreSQL | scikit-learn | MLflow | Stripe',
 'Integrated a 35-house, 150-reference catalogue, bottle-size Quick add, explainable recommendations, demand forecasts and server-priced Stripe checkout. Historical customer behaviour is simulated; Stripe payments use test mode.')
project('MeterWise - Estate Energy &amp; Facilities Analytics','React | TypeScript | FastAPI | SQL | Recharts',
 'Developed energy dashboards, validated CSV imports, tenant views, alert investigations and estate maintenance workflows. Estate inventory uses public HDB data; meter readings and work orders are simulated.')
project('Playlist Port - Spotify Playlist Copying','React | Node.js | Express | Spotify Web API | OAuth 2.0',
 'Built same-account and second-account playlist copying with server-held tokens, pagination and verified item order. Supports Free and Premium accounts. Development-mode accounts require owner approval; other music services are planned.')
story.append(PageBreak())
add('WAI YAN HPONE LAT','name');add('TECHNICAL SKILLS &amp; FURTHER PROJECT EXPERIENCE','role')
add('TECHNICAL SKILLS','section')
add('<b>Languages &amp; frontend:</b> Python, JavaScript, TypeScript, SQL, HTML, CSS, React, React Router, Vite, Material UI, Tailwind CSS, Bootstrap.<br/>'
    '<b>Backend &amp; integration:</b> FastAPI, Django, Flask, Node.js, Express.js, REST APIs, OAuth 2.0, Stripe integration, signed webhooks.<br/>'
    '<b>Databases &amp; security:</b> PostgreSQL, MySQL, SQLite, SQLAlchemy, Sequelize, sessions, JWT, password hashing, CSRF and role/ownership checks.<br/>'
    '<b>Data &amp; modelling:</b> KNIME, SAS Viya, NumPy, pandas, scikit-learn, PyTorch, MLflow; cleaning, validation, exploratory analysis and model evaluation.<br/>'
    '<b>Development:</b> Git, GitHub, VS Code, npm, Postman, pytest, Vercel.')
add('SCHOOL PROJECTS','section')
project('Annual Leave Management System - Team Project, Member 3','React | Vite | Tailwind CSS | Node.js | Express | Sequelize | MySQL',
 'My documented work focused on the Supervisor-to-Manager approval flow, final-approval leave deduction, delegation and acting approvers, comments/rejection reasons, audit history, notifications and reminder/escalation logic. Contributed integration and debugging, including protection against rapid duplicate submissions.')
project('Gym Calories Predictive Analysis','KNIME | SAS Viya',
 'Prepared 950 validated records from 4,865 raw observations by removing duplicates and invalid heart-rate records. Compared regression, decision tree, random forest and gradient boosting models on a consistent 70/30 partition, and communicated feature relationships and validation results.')
add('HACKATHON WORK IN PROGRESS','section')
project('ScamDar - HackIT 2026, Four-Member Team','React | FastAPI | Python | SQLite',
 'Built a working local prototype with mentorship and AI assistance. The prototype explains suspicious-message risks and supports community reports, votes, comments, trends and trusted-contact links. Continuing refinement; no hosted release is claimed.')
add('EARLIER PROJECT EXPERIENCE','section')
project('Invoice Dashboard &amp; Payment Tracking System','Python | Flask | JavaScript | Bootstrap | SQLite',
 'Built invoice/revenue summaries, payment recording and Paid/Outstanding/Overdue states, with client search, status filters and input validation.')
project('NYP Chess Club Website + Live Ratings Widget','HTML | Bootstrap | JavaScript | Python | Chess.com Public Stats API',
 'Built a responsive club website with an embedded ratings widget. Automated hourly public-rating updates with Python and integrated the generated widget using an iframe.')
add('CERTIFICATIONS &amp; SOFT SKILLS','section')
add('<b>IBM SkillsBuild:</b> Web Development Fundamentals; User Experience Design Fundamentals.<br/>'
    '<b>Soft skills:</b> Communication, problem solving and logical thinking.')
doc=SimpleDocTemplate(str(OUT),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=32,bottomMargin=53,title='Wai Yan Hpone Lat - Resume',author='Wai Yan Hpone Lat')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
print(OUT)
