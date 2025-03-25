'use client';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import RightComp from '@/components/RightComp/RightComp';
import { UiLayout } from '@/components/UiLayout/UiLayout';

const FormLayout = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure this is only set on the client
  }, []);

  // Show a fallback while waiting for client-side rendering
  if (!isClient) {
    return <div>Loading...</div>; // Fallback content, or loading spinner
  }

  return (
    <div className="overflow-hidden z-10 min-w-full min-h-[calc(100vh-82px)] relative bg-[#000] after:content-[''] after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-[#0000003A] after:absolute flex flex-col items-center justify-center h-full w-full text-white ">
      <UiLayout>
        <div className='flex items-center flex-col w-full min-h-[calc(100vh-82px)] gap-8 px-2 md:px-8 z-10 relative py-12'>
          <RightComp />
        </div>
      </UiLayout>
    </div>
  )
}

export default FormLayout
