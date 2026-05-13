"use client";

import { useResumeStore } from "@/store/useResumeStore";

interface ResumePreviewProps {
  template?: string;
}

export default function ResumePreview({ template = "classic" }: ResumePreviewProps) {
  const { data } = useResumeStore();
  const { personalInfo, experience, education, projects, skills, certifications, achievements } = data;

  if (template === "aesthetic") {
    return (
      <div className="font-sans text-[10.5pt] leading-relaxed" style={{ color: '#3f3f46' }}>
        <div className="border-b-[3px] border-emerald-400 pb-6 mb-6 text-center">
          <h1 className="text-4xl font-light tracking-widest text-emerald-950 mb-3 uppercase">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <div className="text-sm flex flex-wrap justify-center gap-4 text-emerald-800/70 font-medium">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mb-6 text-center px-8">
            <p className="text-zinc-600 italic leading-relaxed">"{personalInfo.summary}"</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-emerald-700 uppercase tracking-widest mb-4 text-center">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-emerald-300 before:rounded-full">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-zinc-800 text-base">{exp.position}</h3>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      {exp.startDate} {exp.endDate && `— ${exp.endDate}`}
                    </span>
                  </div>
                  <div className="font-medium text-zinc-500 mb-2">{exp.company}</div>
                  <p className="text-zinc-600 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-emerald-700 uppercase tracking-widest mb-4 text-center">Projects</h2>
            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-emerald-300 before:rounded-full">
                  <h3 className="font-semibold text-zinc-800 text-base mb-1">
                    {proj.title}
                    {proj.link && <span className="text-sm font-normal text-emerald-600 ml-2">({proj.link})</span>}
                  </h3>
                  <p className="text-zinc-600 whitespace-pre-wrap">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-emerald-700 uppercase tracking-widest mb-4 text-center">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-emerald-300 before:rounded-full">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-zinc-800">{edu.degree}</h3>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      {edu.startDate} {edu.endDate && `— ${edu.endDate}`}
                    </span>
                  </div>
                  <div className="font-medium text-zinc-500">{edu.school}</div>
                  {edu.description && <p className="text-zinc-600 text-sm mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {(skills || certifications || achievements) && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-emerald-700 uppercase tracking-widest mb-4 text-center">Additional Information</h2>
            <div className="bg-emerald-50/50 rounded-xl p-6 text-sm text-zinc-700 space-y-3">
              {skills && <div><strong className="text-emerald-900 font-medium">Skills:</strong> {skills}</div>}
              {certifications && <div><strong className="text-emerald-900 font-medium">Certifications:</strong> {certifications}</div>}
              {achievements && <div><strong className="text-emerald-900 font-medium">Achievements:</strong> {achievements}</div>}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (template === "professional") {
    return (
      <div className="font-sans text-[10pt] leading-snug flex min-h-[297mm] -m-10" style={{ color: '#1e293b' }}>
        {/* Left Column (Dark) */}
        <div className="w-[30%] bg-slate-800 text-slate-300 p-8 flex flex-col gap-8 shrink-0">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 leading-tight">
              {personalInfo.fullName || "Your Name"}
            </h1>
          </div>
          
          <div className="space-y-4 text-sm">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-600 pb-2 mb-3">Contact</h2>
            {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.website && <div className="break-all text-slate-200">{personalInfo.website}</div>}
          </div>

          {(skills || certifications || achievements) && (
            <div className="space-y-6 text-sm flex-1">
              {skills && (
                <div>
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-600 pb-2 mb-3">Skills</h2>
                  <p className="whitespace-pre-wrap">{skills}</p>
                </div>
              )}
              {certifications && (
                <div>
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-600 pb-2 mb-3">Certifications</h2>
                  <p className="whitespace-pre-wrap">{certifications}</p>
                </div>
              )}
              {achievements && (
                <div>
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-600 pb-2 mb-3">Achievements</h2>
                  <p className="whitespace-pre-wrap">{achievements}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column (Light) */}
        <div className="w-[70%] bg-white p-8">
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-3">Professional Summary</h2>
              <p className="text-slate-600 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-4">Experience</h2>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-800 text-base">{exp.position}</h3>
                      <span className="text-xs font-semibold text-slate-500">
                        {exp.startDate} {exp.endDate && `— ${exp.endDate}`}
                      </span>
                    </div>
                    <div className="font-semibold text-indigo-600 text-sm mb-2">{exp.company}</div>
                    <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-4">Projects</h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-bold text-slate-800 text-base mb-1">
                      {proj.title}
                      {proj.link && <span className="text-xs font-normal text-indigo-500 ml-2">({proj.link})</span>}
                    </h3>
                    <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-800">{edu.degree}</h3>
                      <span className="text-xs font-semibold text-slate-500">
                        {edu.startDate} {edu.endDate && `— ${edu.endDate}`}
                      </span>
                    </div>
                    <div className="text-indigo-600 text-sm font-medium">{edu.school}</div>
                    {edu.description && <p className="text-slate-600 text-sm mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (template === "modern") {
    return (
      <div className="font-sans text-[10pt] leading-relaxed" style={{ color: '#1f2937' }}>
        {/* Header */}
        <div className="border-l-4 border-blue-600 pl-6 mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <div className="text-sm flex flex-wrap gap-x-4 gap-y-1 text-gray-600 font-medium">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.website && <span className="text-blue-600">{personalInfo.website}</span>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            {/* Summary */}
            {personalInfo.summary && (
              <div>
                <h2 className="text-lg font-bold text-blue-600 uppercase tracking-wider mb-2">Profile</h2>
                <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-blue-600 uppercase tracking-wider mb-3">Experience</h2>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <h3 className="font-bold text-gray-900 text-base">{exp.position}</h3>
                      <div className="flex justify-between items-center text-sm font-medium text-gray-600 mb-1">
                        <span>{exp.company}</span>
                        <span>{exp.startDate} {exp.endDate && `- ${exp.endDate}`}</span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-blue-600 uppercase tracking-wider mb-3">Projects</h2>
                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <h3 className="font-bold text-gray-900 text-base">
                        {proj.title}
                        {proj.link && <span className="text-sm font-normal text-blue-600 ml-2">({proj.link})</span>}
                      </h3>
                      <p className="text-gray-700 mt-1 whitespace-pre-wrap">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-span-1 space-y-6">
            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-blue-600 uppercase tracking-wider mb-3">Education</h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <div className="text-sm font-medium text-gray-600">{edu.school}</div>
                      <div className="text-xs text-gray-500 mb-1">
                        {edu.startDate} {edu.endDate && `- ${edu.endDate}`}
                      </div>
                      {edu.description && <p className="text-gray-700 text-sm mt-1">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills && (
              <div>
                <h2 className="text-lg font-bold text-blue-600 uppercase tracking-wider mb-3">Skills</h2>
                <p className="text-gray-700">{skills}</p>
              </div>
            )}

            {/* Certifications */}
            {certifications && (
              <div>
                <h2 className="text-lg font-bold text-blue-600 uppercase tracking-wider mb-3">Certifications</h2>
                <p className="text-gray-700">{certifications}</p>
              </div>
            )}

            {/* Achievements */}
            {achievements && (
              <div>
                <h2 className="text-lg font-bold text-blue-600 uppercase tracking-wider mb-3">Achievements</h2>
                <p className="text-gray-700">{achievements}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (template === "minimal") {
    return (
      <div className="font-sans text-[10.5pt] leading-normal" style={{ color: '#27272a' }}>
        <div className="mb-8">
          <h1 className="text-3xl font-medium tracking-tight mb-2 text-black">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <div className="text-sm flex flex-wrap gap-3 text-zinc-500">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mb-6">
            <p className="text-zinc-700">{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Experience</h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 text-sm text-zinc-500 pt-1">
                    {exp.startDate} — {exp.endDate || "Present"}
                  </div>
                  <div className="col-span-3">
                    <h3 className="font-semibold text-black">{exp.position}</h3>
                    <div className="text-zinc-600 mb-1">{exp.company}</div>
                    <p className="text-zinc-700 whitespace-pre-wrap">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Projects</h2>
            <div className="space-y-5">
              {projects.map((proj) => (
                <div key={proj.id} className="grid grid-cols-4 gap-4">
                  <div className="col-span-1"></div>
                  <div className="col-span-3">
                    <h3 className="font-semibold text-black">
                      {proj.title}
                      {proj.link && <span className="text-sm font-normal text-zinc-500 ml-2">({proj.link})</span>}
                    </h3>
                    <p className="text-zinc-700 mt-1 whitespace-pre-wrap">{proj.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 text-sm text-zinc-500 pt-1">
                    {edu.startDate} — {edu.endDate || "Present"}
                  </div>
                  <div className="col-span-3">
                    <h3 className="font-semibold text-black">{edu.school}</h3>
                    <div className="text-zinc-700">{edu.degree}</div>
                    {edu.description && <p className="text-zinc-600 mt-1">{edu.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(skills || certifications || achievements) && (
          <div>
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Other Info</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1"></div>
              <div className="col-span-3 space-y-2">
                {skills && <div><strong className="font-medium text-black">Skills:</strong> <span className="text-zinc-700">{skills}</span></div>}
                {certifications && <div><strong className="font-medium text-black">Certifications:</strong> <span className="text-zinc-700">{certifications}</span></div>}
                {achievements && <div><strong className="font-medium text-black">Achievements:</strong> <span className="text-zinc-700">{achievements}</span></div>}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Classic (Default)
  return (
    <div className="font-serif text-[11pt] leading-snug" style={{ color: '#000000' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-1">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="text-sm flex flex-wrap justify-center gap-2" style={{ color: '#52525b' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-5">
          <p className="text-justify">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase mb-2 pb-1" style={{ borderBottom: '1px solid #000000' }}>Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold">
                  <span>{exp.position}</span>
                  <span className="text-xs font-normal">
                    {exp.startDate} {exp.endDate && `- ${exp.endDate}`}
                  </span>
                </div>
                <div className="font-semibold text-sm italic">{exp.company}</div>
                <p className="text-sm mt-1 whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase mb-2 pb-1" style={{ borderBottom: '1px solid #000000' }}>Projects</h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold">{proj.title}</span>
                  {proj.link && <span className="text-xs italic">({proj.link})</span>}
                </div>
                <p className="text-sm mt-1 whitespace-pre-wrap">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase mb-2 pb-1" style={{ borderBottom: '1px solid #000000' }}>Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline font-bold">
                  <span>{edu.school}</span>
                  <span className="text-xs font-normal">
                    {edu.startDate} {edu.endDate && `- ${edu.endDate}`}
                  </span>
                </div>
                <div className="italic text-sm">{edu.degree}</div>
                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Certs */}
      {(skills || certifications || achievements) && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase mb-2 pb-1" style={{ borderBottom: '1px solid #000000' }}>Skills & Additional Info</h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            {skills && <li><span className="font-bold">Skills:</span> {skills}</li>}
            {certifications && <li><span className="font-bold">Certifications:</span> {certifications}</li>}
            {achievements && <li><span className="font-bold">Achievements:</span> {achievements}</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
