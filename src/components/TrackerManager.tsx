"use client";
import React from "react";
import {
  listMaternalProfiles,
  listChildProfiles,
  createMaternalProfile,
  createChildProfile,
  toggleAncVisit,
  toggleVaccineDose,
  deleteMaternalProfile,
  deleteChildProfile,
  BanglaTrackerCopy,
} from "@/lib/tracker";

function formatDate(d: string) {
  return d;
}

export const TrackerManager: React.FC = () => {
  const [maternal, setMaternal] = React.useState(listMaternalProfiles());
  const [child, setChild] = React.useState(listChildProfiles());
  const [edd, setEdd] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [tab, setTab] = React.useState<'maternal' | 'child'>('maternal');

  function refresh() {
    setMaternal(listMaternalProfiles());
    setChild(listChildProfiles());
  }

  function handleAddMaternal(e: React.FormEvent) {
    e.preventDefault();
    if (!edd) return;
    createMaternalProfile(edd);
    setEdd("");
    refresh();
  }

  function handleAddChild(e: React.FormEvent) {
    e.preventDefault();
    if (!birthDate) return;
    createChildProfile(birthDate);
    setBirthDate("");
    refresh();
  }

  function toggleVisit(profileId: string, visitId: string) {
    toggleAncVisit(profileId, visitId); refresh();
  }
  function toggleDose(profileId: string, doseId: string) {
    toggleVaccineDose(profileId, doseId); refresh();
  }

  return (
    <div className="space-y-8">
      <div className="flex gap-3">
        <button onClick={() => setTab('maternal')} className={`px-3 py-1.5 rounded-md border text-sm ${tab==='maternal' ? 'bg-primary-600 text-white border-primary-600' : 'hover:bg-primary-50 dark:hover:bg-neutral-800'}`}>{BanglaTrackerCopy.maternalHeader}</button>
        <button onClick={() => setTab('child')} className={`px-3 py-1.5 rounded-md border text-sm ${tab==='child' ? 'bg-primary-600 text-white border-primary-600' : 'hover:bg-primary-50 dark:hover:bg-neutral-800'}`}>{BanglaTrackerCopy.childHeader}</button>
      </div>
      {tab === 'maternal' && (
        <div className="space-y-6">
          <form onSubmit={handleAddMaternal} className="flex flex-wrap gap-3 items-end">
            <div className="flex flex-col">
              <label htmlFor="edd" className="text-sm font-medium">{BanglaTrackerCopy.eddLabel}</label>
              <input id="edd" type="date" value={edd} onChange={e => setEdd(e.target.value)} className="rounded-md border px-3 py-2 text-sm dark:bg-neutral-800" required />
            </div>
            <button type="submit" className="btn btn-primary">{BanglaTrackerCopy.addMaternal}</button>
          </form>
          {maternal.length === 0 && <p className="text-sm text-neutral-600 dark:text-neutral-400">{BanglaTrackerCopy.noProfiles}</p>}
          <div className="grid gap-6 md:grid-cols-2">
            {maternal.map(p => (
              <div key={p.id} className="rounded-md border p-4 bg-white/60 dark:bg-neutral-900/50 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm">EDD: {p.expectedDeliveryDate}</h3>
                  <button onClick={() => { deleteMaternalProfile(p.id); refresh(); }} className="text-xs text-red-600 hover:underline">{BanglaTrackerCopy.delete}</button>
                </div>
                <ul className="space-y-1">
                  {p.visits.map(v => (
                    <li key={v.id} className="flex items-center justify-between text-xs">
                      <span>{v.week} সপ্তাহ • {formatDate(v.dueDate)}</span>
                      <button onClick={() => toggleVisit(p.id, v.id)} className={`px-2 py-1 rounded-md border ${v.completed ? 'bg-green-600 text-white border-green-600' : 'hover:bg-green-50 dark:hover:bg-neutral-800'}`}>{v.completed ? 'সম্পন্ন' : 'করুন'}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === 'child' && (
        <div className="space-y-6">
          <form onSubmit={handleAddChild} className="flex flex-wrap gap-3 items-end">
            <div className="flex flex-col">
              <label htmlFor="birthDate" className="text-sm font-medium">{BanglaTrackerCopy.birthDateLabel}</label>
              <input id="birthDate" type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="rounded-md border px-3 py-2 text-sm dark:bg-neutral-800" required />
            </div>
            <button type="submit" className="btn btn-primary">{BanglaTrackerCopy.addChild}</button>
          </form>
          {child.length === 0 && <p className="text-sm text-neutral-600 dark:text-neutral-400">{BanglaTrackerCopy.noProfiles}</p>}
          <div className="grid gap-6 md:grid-cols-2">
            {child.map(c => (
              <div key={c.id} className="rounded-md border p-4 bg-white/60 dark:bg-neutral-900/50 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm">জন্ম: {c.birthDate}</h3>
                  <button onClick={() => { deleteChildProfile(c.id); refresh(); }} className="text-xs text-red-600 hover:underline">{BanglaTrackerCopy.delete}</button>
                </div>
                <ul className="space-y-1">
                  {c.doses.map(d => (
                    <li key={d.id} className="flex items-center justify-between text-xs">
                      <span>{d.labelBn} • {formatDate(d.dueDate)}</span>
                      <button onClick={() => toggleDose(c.id, d.id)} className={`px-2 py-1 rounded-md border ${d.completed ? 'bg-green-600 text-white border-green-600' : 'hover:bg-green-50 dark:hover:bg-neutral-800'}`}>{d.completed ? 'সম্পন্ন' : 'করুন'}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      <p className="text-xs text-neutral-600 dark:text-neutral-400">{BanglaTrackerCopy.disclaimer}</p>
    </div>
  );
};

export default TrackerManager;
