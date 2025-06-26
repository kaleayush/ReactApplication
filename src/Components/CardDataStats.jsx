import React from 'react'
function CardDataStats ({
   title,
   total, 
   children,
   css=""
}) {
  
  return (
    <div className={`rounded-lg shadow border border-stone-100 py-6 px-7 dark:border-stone-700 dark:bg-slate-700 ${css}`}>
        <div className='flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-700 text-gray-500'>
            {children}
        </div>
        <div className='mt-4 flex items-end justify-between'>
        <div>
          <h4 className="text-title-md font-bold text-white dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium text-white">{title}</span>
        </div>
        </div>
    </div>
  )
}
export default CardDataStats