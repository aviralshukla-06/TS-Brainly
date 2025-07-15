
import { Button } from './components/Button'
import { Card } from './components/Card'
import { SideBar } from './components/SideBar'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'


function App() {


  return (
    <>
      <div className='flex text-sm'>
        <Button size='md' variant='secondary' text='Share' startIcon={<ShareIcon size='sm' />} />
        <Button size='md' variant='primary' text='Add Content' startIcon={<PlusIcon size='sm' />} />

      </div>
      <div className='flex'>
        <div className='w-[25%] '>
          <SideBar />
        </div>
        <div className='flex justify-evenly border border-black w-[74%] ml-[1%] '>
          <Card title="My Document"
            link="https://example.com"
            description="This is a very useful document for reference."
            date={new Date()}
          />
          <Card title="My Document"
            link="https://example.com"
            description="This is a very useful document for reference."
            date={new Date()}
          />
          <Card title="My Document"
            link="https://example.com"
            description="This is a very useful document for reference."
            date={new Date()}
          />
          <Card title="My Document"
            link="https://example.com"
            description="This is a very useful document for reference."
            date={new Date()}
          />
          {/* <Card />
          <Card />
          <Card /> */}
        </div>
      </div>
    </>
  )
}

export default App
