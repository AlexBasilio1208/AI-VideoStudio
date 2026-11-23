export const navigation = [
  { label: 'Overview', icon: 'LayoutDashboard', group: 'Workspace' },
  { label: 'Workflows', icon: 'Workflow', group: 'Workspace' },
  { label: 'Projects', icon: 'PanelsTopLeft', group: 'Workspace' },
  { label: 'Prompt vault', icon: 'Library', group: 'Knowledge' },
  { label: 'Tool directory', icon: 'Blocks', group: 'Knowledge' },
  { label: 'Documentation', icon: 'BookOpen', group: 'Knowledge' },
  { label: 'Experiment lab', icon: 'FlaskConical', group: 'Knowledge' },
  { label: 'Updates', icon: 'History', group: 'System' },
]

export const initialProjects = [
  { id: 1, title: 'The Lantern Keeper', type: 'Fantasy short', stage: 'Scripting', progress: 18, updated: 'Today' },
  { id: 2, title: 'Portal in the Woods', type: 'Visual experiment', stage: 'Image generation', progress: 42, updated: 'Yesterday' },
  { id: 3, title: 'Tiny Kingdom', type: 'Character test', stage: 'Completed', progress: 100, updated: 'Nov 20' },
]

export const workflowSteps = [
  ['01', 'Research & concept', 'Define the hook, audience, story idea and visual direction.'],
  ['02', 'Script & storyboard', 'Write narration, break the story into scenes and plan shots.'],
  ['03', 'Create visual assets', 'Generate character references, locations and keyframes.'],
  ['04', 'Animate scenes', 'Turn approved keyframes into short motion clips.'],
  ['05', 'Voice & sound', 'Create narration, ambience and sound effects.'],
  ['06', 'Edit & publish', 'Assemble, subtitle, quality-check and export the final video.'],
]

export const starterPrompts = [
  { id: 1, title: 'Character reference sheet', category: 'Image generation', status: 'Untested', tool: 'Image generator', prompt: 'Create a consistent character reference sheet for [CHARACTER]. Show front, side and three-quarter views, a clear silhouette, consistent clothing and a neutral expression. Keep the background simple and the design repeatable across scenes.' },
  { id: 2, title: 'Cinematic image-to-video motion', category: 'Animation', status: 'Untested', tool: 'Image-to-video', prompt: 'Animate the provided image while preserving the subject identity, outfit, proportions and environment. [SUBJECT ACTION]. Camera: [CAMERA MOVEMENT]. Natural motion, stable composition, no morphing, no extra limbs, no sudden scene changes.' },
  { id: 3, title: 'Short-form story hook', category: 'Storytelling', status: 'Untested', tool: 'LLM', prompt: 'Write 5 curiosity-driven opening hooks for a 60-second [GENRE] story about [CONCEPT]. Each hook should create an unanswered question in the first 3 seconds without revealing the ending.' },
]
