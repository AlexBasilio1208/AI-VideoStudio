import React, { useEffect, useMemo, useState } from 'react'
import * as Icons from 'lucide-react'
import { navigation, initialProjects, workflowSteps, starterPrompts } from './data'

const icon = (name, props={}) => {
  const C = Icons[name] || Icons.Circle
  return <C size={18} strokeWidth={1.8} {...props} />
}
const read = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback }
}

export default function App() {
  const [page, setPage] = useState('Overview')
  const [theme, setTheme] = useState(() => read('avso-theme', 'dark'))
  const [projects, setProjects] = useState(() => read('avso-projects', initialProjects))
  const [prompts, setPrompts] = useState(() => read('avso-prompts', starterPrompts))
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState('')
  const [showProject, setShowProject] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projectType, setProjectType] = useState('Short-form story')
  const [showPrompt, setShowPrompt] = useState(false)
  const [promptName, setPromptName] = useState('')
  const [promptText, setPromptText] = useState('')
  const [promptCategory, setPromptCategory] = useState('Image generation')

  useEffect(() => { localStorage.setItem('avso-theme', JSON.stringify(theme)) }, [theme])
  useEffect(() => { localStorage.setItem('avso-projects', JSON.stringify(projects)) }, [projects])
  useEffect(() => { localStorage.setItem('avso-prompts', JSON.stringify(prompts)) }, [prompts])
  const notify = (message) => { setToast(message); window.clearTimeout(window.__avsoToast); window.__avsoToast = window.setTimeout(() => setToast(''), 2400) }
  const filteredPrompts = useMemo(() => prompts.filter(p => `${p.title} ${p.category} ${p.tool}`.toLowerCase().includes(query.toLowerCase())), [prompts, query])
  const completed = projects.filter(p => p.stage === 'Completed').length

  async function copy(text) {
    try { await navigator.clipboard.writeText(text); notify('Copied to clipboard') }
    catch { notify('Clipboard unavailable — select and copy the text') }
  }
  function addProject(e) {
    e.preventDefault()
    if (!projectName.trim()) return
    setProjects([{ id: Date.now(), title: projectName.trim(), type: projectType, stage: 'Idea', progress: 0, updated: 'Just now' }, ...projects])
    setProjectName(''); setShowProject(false); notify('Project added')
  }
  function addPrompt(e) {
    e.preventDefault()
    if (!promptName.trim() || !promptText.trim()) return
    setPrompts([{ id: Date.now(), title: promptName.trim(), category: promptCategory, status: 'Untested', tool: 'Not assigned', prompt: promptText.trim() }, ...prompts])
    setPromptName(''); setPromptText(''); setShowPrompt(false); notify('Prompt saved')
  }

  return <div className="app-shell" data-theme={theme}>
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">{icon('Clapperboard', {size:21})}</div><div><strong>STUDIO OS</strong><span>AI VIDEO WORKSPACE</span></div></div>
      <div className="workspace-label">PERSONAL WORKSPACE</div>
      {['Workspace','Knowledge','System'].map(group => <div className="nav-group" key={group}>
        <div className="nav-heading">{group}</div>
        {navigation.filter(n => n.group === group).map(n => <button key={n.label} className={`nav-link ${page === n.label ? 'active' : ''}`} onClick={() => setPage(n.label)}>{icon(n.icon)}<span>{n.label}</span>{n.label === 'Projects' && <em>{projects.length}</em>}</button>)}
      </div>)}
      <div className="sidebar-bottom"><div className="status-dot"/> <span>Workspace saved locally</span><button title="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{icon(theme === 'dark' ? 'Sun' : 'Moon')}</button></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="crumb">Studio OS <span>/</span> <b>{page}</b></div><div className="top-actions"><span className="local-pill"><i/> Local workspace</span><button className="icon-btn" title="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{icon(theme === 'dark' ? 'Sun' : 'Moon')}</button><div className="avatar">A</div></div></header>
      <div className="content">
        {page === 'Overview' && <><div className="welcome-row"><div><div className="eyebrow">MONDAY, NOVEMBER 23, 2026</div><h1>Your production, <span>in focus.</span></h1><p className="subhead">A calm place to plan, experiment and build better AI videos.</p></div><button className="primary-btn" onClick={() => setShowProject(true)}>{icon('Plus')} New project</button></div>
          <div className="stat-grid"><Stat icon="PanelsTopLeft" label="Total projects" value={projects.length} note="Across your workspace"/><Stat icon="Clapperboard" label="In production" value={projects.filter(p => p.stage !== 'Completed').length} note="Ideas through editing"/><Stat icon="CheckCircle2" label="Completed" value={completed} note="Finished projects"/><Stat icon="Library" label="Saved prompts" value={prompts.length} note="Reusable building blocks"/></div>
          <div className="section-grid"><section className="panel"><div className="panel-head"><div><div className="eyebrow">YOUR WORKSPACE</div><h2>Recent projects</h2></div><button className="text-btn" onClick={() => setPage('Projects')}>View all {icon('ArrowRight', {size:15})}</button></div><ProjectList projects={projects.slice(0,4)} onChange={setProjects} notify={notify}/></section>
          <section className="panel quick-panel"><div className="eyebrow">QUICK ACCESS</div><h2>Pick up where you left off.</h2><p>Jump into the tools you use most often.</p><Quick title="Prompt vault" detail="Find and reuse tested prompts" iconName="Library" onClick={() => setPage('Prompt vault')}/><Quick title="Tool directory" detail="Your AI tool bookmarks" iconName="Blocks" onClick={() => setPage('Tool directory')}/><Quick title="Workflow center" detail="Follow your production pipeline" iconName="Workflow" onClick={() => setPage('Workflows')}/></section></div>
          <section className="panel pipeline-panel"><div className="panel-head"><div><div className="eyebrow">THE BIG PICTURE</div><h2>Production pipeline</h2></div><button className="text-btn" onClick={() => setPage('Workflows')}>Open workflow {icon('ArrowRight',{size:15})}</button></div><div className="pipeline">{workflowSteps.map((s,i)=><div className="pipe-step" key={s[0]}><span>{s[0]}</span><b>{s[1]}</b>{i < workflowSteps.length-1 && <div className="pipe-line"/>}</div>)}</div></section>
        </>}
        {page === 'Projects' && <><PageTitle eyebrow="WORKSPACE / LIBRARY" title="Project library" desc="Every video starts somewhere. Keep the whole production organized." action={<button className="primary-btn" onClick={() => setShowProject(true)}>{icon('Plus')} New project</button>}/><div className="panel"><ProjectList projects={projects} onChange={setProjects} notify={notify}/></div></>}
        {page === 'Prompt vault' && <><PageTitle eyebrow="KNOWLEDGE / REUSABLE ASSETS" title="Prompt vault" desc="A searchable home for prompts, templates and tested instructions." action={<button className="primary-btn" onClick={() => setShowPrompt(true)}>{icon('Plus')} Add prompt</button>}/><div className="search-wrap">{icon('Search')}<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search prompts, categories or tools..."/></div><div className="prompt-grid">{filteredPrompts.map(p=><article className="prompt-card" key={p.id}><div className="prompt-meta"><span className="tag">{p.category}</span><span className="untested">{p.status}</span></div><h3>{p.title}</h3><p>{p.tool}</p><div className="prompt-preview">{p.prompt}</div><button className="secondary-btn full" onClick={()=>copy(p.prompt)}>{icon('Copy')} Copy prompt</button></article>)}</div>{!filteredPrompts.length && <Empty title="No prompts found" text="Try another search or add a new prompt."/>}</>}
        {page === 'Workflows' && <><PageTitle eyebrow="WORKSPACE / PRODUCTION SYSTEM" title="Workflow center" desc="A repeatable process from first idea to published video."/><div className="workflow-list">{workflowSteps.map((s,i)=><div className="workflow-card" key={s[0]}><div className="workflow-number">{s[0]}</div><div><h3>{s[1]}</h3><p>{s[2]}</p><small>{['Research notes · reference links','Narration · scene list · storyboard','Character sheets · locations · keyframes','Motion prompts · generated clips','Voiceover · ambience · SFX','Timeline · captions · export checklist'][i]}</small></div><span className="step-state">Planned</span></div>)}</div></>}
        {page === 'Tool directory' && <><PageTitle eyebrow="KNOWLEDGE / APPLICATIONS" title="Tool directory" desc="Keep your AI applications, capabilities and free-tier notes in one place."/><div className="notice">{icon('Info')} Tool entries are a starter template. Add verified links, current free allowances and your own test results before relying on them.</div><div className="tool-grid">{[['Image generation','Create character, prop and environment references','Image'],['Video generation','Animate still images and generate motion clips','Clapperboard'],['Voice & audio','Narration, dialogue and sound design','AudioWaveform'],['Editing','Assemble clips, subtitles and final exports','Scissors'],['Research & writing','Research, story development and prompt drafting','NotebookPen'],['Storage & publishing','Organize assets and publish finished videos','Cloud']].map(t=><div className="tool-card" key={t[0]}><div className="tool-icon">{icon(t[2])}</div><h3>{t[0]}</h3><p>{t[1]}</p><span className="tag">Add tools in Phase 2</span></div>)}</div></>}
        {page === 'Documentation' && <><PageTitle eyebrow="KNOWLEDGE / FIELD NOTES" title="Documentation" desc="Your personal operating manual. Record what works, why it works and how to repeat it."/><div className="panel doc-panel"><div className="doc-row">{icon('BookOpen')}<div><b>Production handbook</b><p>Document your complete end-to-end process.</p></div><span className="tag">To write</span></div><div className="doc-row">{icon('SlidersHorizontal')}<div><b>Tool settings & recipes</b><p>Model settings, aspect ratios, durations and export presets.</p></div><span className="tag">To write</span></div><div className="doc-row">{icon('Lightbulb')}<div><b>Lessons learned</b><p>Record failures, fixes and repeatable discoveries.</p></div><span className="tag">To write</span></div></div></>}
        {page === 'Experiment lab' && <><PageTitle eyebrow="KNOWLEDGE / R&D" title="Experiment lab" desc="Test methods deliberately. Keep the result, not just the prompt."/><div className="empty-panel">{icon('FlaskConical',{size:30})}<h3>Make every test teach you something.</h3><p>For each experiment, record the tool, model, prompt version, settings, output quality, time spent and what you would change next time.</p><button className="secondary-btn" onClick={()=>setPage('Prompt vault')}>Start with a prompt</button></div></>}
        {page === 'Updates' && <><PageTitle eyebrow="SYSTEM / CHANGELOG" title="Updates & discoveries" desc="A timeline of changes to your production system."/><div className="panel"><div className="doc-row">{icon('Rocket')}<div><b>Studio OS · Foundation v0.1</b><p>Initial workspace, local persistence, theme toggle, starter projects, prompt vault and production workflow.</p></div><span className="tag">Nov 23, 2026</span></div></div></>}
      </div>
      <footer>AI VIDEO STUDIO OS <span>Built for deliberate creative work.</span><span>v0.1 · Foundation</span></footer>
    </main>
    {showProject && <Modal title="Create a project" close={()=>setShowProject(false)}><form onSubmit={addProject}><label>Project name<input autoFocus value={projectName} onChange={e=>setProjectName(e.target.value)} placeholder="e.g. The Clockwork Forest" required/></label><label>Project type<select value={projectType} onChange={e=>setProjectType(e.target.value)}><option>Short-form story</option><option>Visual experiment</option><option>Character test</option><option>Educational video</option><option>Other</option></select></label><button className="primary-btn full" type="submit">Create project</button></form></Modal>}
    {showPrompt && <Modal title="Save a prompt" close={()=>setShowPrompt(false)}><form onSubmit={addPrompt}><label>Prompt name<input autoFocus value={promptName} onChange={e=>setPromptName(e.target.value)} placeholder="Give this prompt a useful name" required/></label><label>Category<select value={promptCategory} onChange={e=>setPromptCategory(e.target.value)}><option>Image generation</option><option>Animation</option><option>Storytelling</option><option>Voice & audio</option><option>Editing</option><option>Other</option></select></label><label>Prompt<textarea rows="6" value={promptText} onChange={e=>setPromptText(e.target.value)} placeholder="Write or paste your prompt..." required/></label><button className="primary-btn full" type="submit">Save prompt</button></form></Modal>}
    {toast && <div className="toast">{icon('CheckCircle2')} {toast}</div>}
  </div>
}

function Stat({icon:ic,label,value,note}) { return <div className="stat-card"><div className="stat-top">{icon(ic)}<span>{label}</span></div><strong>{value}</strong><small>{note}</small></div> }
function PageTitle({eyebrow,title,desc,action}) { return <div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="subhead">{desc}</p></div>{action}</div> }
function ProjectList({projects,onChange,notify}) { return projects.length ? <div className="project-list">{projects.map(p=><div className="project-row" key={p.id}><div className="project-thumb">{icon('Clapperboard',{size:21})}</div><div className="project-info"><b>{p.title}</b><span>{p.type} · Updated {p.updated}</span><div className="progress"><i style={{width:`${p.progress}%`}}/></div></div><select aria-label={`Status for ${p.title}`} value={p.stage} onChange={e=>onChange(projects.map(x=>x.id===p.id?{...x,stage:e.target.value,progress:e.target.value==='Completed'?100:x.progress,updated:'Just now'}:x))}><option>Idea</option><option>Research</option><option>Scripting</option><option>Image generation</option><option>Animation</option><option>Editing</option><option>Completed</option></select><button className="icon-btn danger-hover" title="Delete project" onClick={()=>{onChange(projects.filter(x=>x.id!==p.id));notify('Project removed')}}>{icon('Trash2',{size:16})}</button></div>)}</div> : <Empty title="No projects yet" text="Create your first project to start building your production history."/> }
function Quick({title,detail,iconName,onClick}) { return <button className="quick-link" onClick={onClick}><span>{icon(iconName)}</span><div><b>{title}</b><small>{detail}</small></div>{icon('ArrowUpRight',{size:16})}</button> }
function Empty({title,text}) { return <div className="empty-state">{icon('FolderOpen',{size:25})}<b>{title}</b><span>{text}</span></div> }
function Modal({title,close,children}) { return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&close()}><div className="modal"><div className="modal-head"><h2>{title}</h2><button className="icon-btn" onClick={close}>{icon('X')}</button></div>{children}</div></div> }
