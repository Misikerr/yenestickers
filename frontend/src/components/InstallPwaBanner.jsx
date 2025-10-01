import React, { useEffect, useState } from 'react'

const InstallPwaBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };
    const onAppInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onAppInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  if (!visible) return null;

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const _ = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
  };

  return (
    <div className='fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-50'>
      <div className='rounded-xl border border-purple-300 dark:border-purple-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur shadow-lg p-4 flex items-center justify-between gap-3'>
        <div>
          <p className='font-semibold text-gray-900 dark:text-gray-100'>Install YeneStickers</p>
          <p className='text-xs text-gray-600 dark:text-gray-300'>Get the app-like experience. Works fine and opens from your home screen.</p>
        </div>
        <div className='flex items-center gap-2'>
          <button onClick={handleInstall} className='px-3 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-sm'>Install</button>
          <button onClick={()=>setVisible(false)} className='px-3 py-2 rounded-md border text-sm border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200'>Not now</button>
        </div>
      </div>
    </div>
  )
}

export default InstallPwaBanner


