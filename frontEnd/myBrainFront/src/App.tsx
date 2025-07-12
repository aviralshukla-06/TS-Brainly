
import { Button } from './components/Button'
import { Card } from './components/Card'
import { SideBar } from './components/SideBar'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'


function App() {


  function extractYoutubeId(url: string): string | null {
    const match = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
    return match ? match[1] : null;
  }

  const imgUrl = extractYoutubeId("https://youtu.be/ovKVqo-L2EM?si=-MoJUhlfCUihTewZ");

  return (
    <>
      <div className=" flex justify-between items-center p-4 col-span-2">
        <span className="font-extrabold text-[30px] justify-center items-center px-2 py-1">My Brain</span>

        <div className="flex gap-2">
          <Button size="md" variant="secondary" text="Share Brain" startIcon={<ShareIcon size="sm" />} />
          <Button size="md" variant="primary" text="Add Content" startIcon={<PlusIcon size="sm" />} />
        </div>
      </div>

      <div className='flex'>
        <div className='w-[20%] '>
          <SideBar />
        </div>
        <div className='flex flex-wrap gap-6 mx-auto justify-evenly  w-[78%] ml-[1%] '>

          <Card
            title="My Document"
            link="https://youtu.be/ovKVqo-L2EM?si=-MoJUhlfCUihTewZ"
            description="This is a very useful document for reference."
            date={new Date()}
            linkPreview={{
              image: `https://i.ytimg.com/vi/${imgUrl}/maxresdefault.jpg`, // ✅ YouTube thumbnail

            }}
          />
          <Card
            title="My Document"
            link="https://youtu.be/2ChgjN7kfXY?si=vk8txNXxc-jSGcUn"
            description="This is a very useful document for reference."
            date={new Date()}
            linkPreview={{
              image: `https://i.ytimg.com/vi/${imgUrl}/maxresdefault.jpg`, // ✅ YouTube thumbnail

            }}
          />
          <Card
            title="My Document"
            link="https://youtu.be/awHq6yrORgc?si=3R1pRWUfkqf0qDKX"
            description="This is a very useful document for reference."
            date={new Date()}
            linkPreview={{
              image: `https://i.ytimg.com/vi/${imgUrl}/maxresdefault.jpg`, // ✅ YouTube thumbnail

            }}
          />
          <Card
            title="My Document"
            link="https://youtu.be/9ZKBFfCGXDE?si=cVBPBJYWGqHKo_x0"
            description="This is a very useful document for reference."
            date={new Date()}
            linkPreview={{
              image: `https://i.ytimg.com/vi/${imgUrl}/maxresdefault.jpg`, // ✅ YouTube thumbnail

            }}
          />

          <Card
            title="My Document"
            link="https://youtu.be/ovKVqo-L2EM?si=-MoJUhlfCUihTewZ"
            description="This is a very useful document for reference."
            date={new Date()}
            linkPreview={{
              image: `https://i.ytimg.com/vi/${imgUrl}/maxresdefault.jpg`, // ✅ YouTube thumbnail

            }}
          />


        </div>
      </div>
    </>
  )
}

export default App
