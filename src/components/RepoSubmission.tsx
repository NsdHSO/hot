import React, { FC, useRef, useState } from 'react'


const RepoSubmission: FC = ()  => {
  
  const [buttonPlaceHolder, setButtonPlaceHolder] = useState<string>("Submit repo?")
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [isSubmissionInProcess, setIsSubmissionInProcess] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const submissionInputRef = useRef<string>("")
  
  
  const saveDataToDataBase = (url: string):void => {
    setIsSubmissionInProcess(true)

    // todo: import the summission function here instead
    setTimeout(() => {

      setIsSubmissionInProcess(false)
      setSubmitted(true)
      setButtonPlaceHolder("Close")
      console.log("Data Submitted")

    }, 2000);
  }

  const submitButtonHandler = ():void => {
    if(!isFormOpen){
      setButtonPlaceHolder("Submit now")
      return setIsFormOpen(true) 
    }

    if(isFormOpen && !submitted){
      saveDataToDataBase(submissionInputRef.current.value as unknown as string )
      console.log(submissionInputRef.current.value as unknown as string)
    }
    if(isFormOpen && submitted){
      setButtonPlaceHolder("Submit repo?")
      setSubmitted(false)
      return setIsFormOpen(false)
    }
  
  }

  return (
    <div className='fixed bottom-[40px] right-[40px] flex items-end flex-col gap-[10px] ' >
        { isFormOpen && !isSubmissionInProcess && !submitted &&
          <div className='bg-white p-[15px] rounded-md min-w-[300px] '>
            <h6 className=' text-[18px] mb-[8px] text-gray-700 font-medium '>Suggest Repository</h6>
            <p className=' text-[12px] mb-[5px] text-gray-500 font-medium '>Repository URL</p>
            <input ref={submissionInputRef} className='bg-gray-200 py-[4px] w-full px-[10px] rounded-md outline-yellow-300 text-gray-500 text-[12px]  ' type="text" placeholder='https://github.com/open-sauced' />
          </div>
        }
        {
          isSubmissionInProcess && 
          <div className='bg-white p-[15px] rounded-md min-w-[300px] '>
            <p className=' text-[12px] mb-[5px] text-gray-500 font-medium '>Submission in process ...</p>
          </div>
        }
        {
          submitted && 
          <div className='bg-white p-[15px] rounded-md min-w-[300px] '>
            <p className=' text-[12px] mb-[5px] text-gray-500 font-medium '>Submission succeeded!</p>
          </div>
        }
        <button disabled={isSubmissionInProcess} onClick={submitButtonHandler} className='bg-saucyRed p-[10px] text-[12px] rounded-md text-white font-bold transform transition-all hover:bg-orange-700 ' > {buttonPlaceHolder} </button>
    </div>
  )
}

export default RepoSubmission