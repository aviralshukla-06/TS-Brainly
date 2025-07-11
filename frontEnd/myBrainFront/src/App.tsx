
import { Button } from './components/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'


function App() {


  return (
    <>
      <div className='flex text-sm'>
        <Button size='md' variant='secondary' text='Share' startIcon={<ShareIcon size='sm' />} />
        <Button size='md' variant='primary' text='Add' startIcon={<PlusIcon size='sm' />} />
      </div>
    </>
  )
}

export default App
