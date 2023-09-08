import Navbar from '@/components/Navbar'
import React from 'react'

const Privacypolicy = () => {
  return (
    <>
    <Navbar/>
    <div className="container about text-lg text-center px-4 mt-2">
      <h1 className="m-2 text-5xl">Privacy Policy</h1>
      {/* <div id="fuse-injected-22842688372-1" data-fuse="22842688372" data-fuse-injected-at="1694177286524" className="fuse-slot-dynamic" data-fuse-code="fuse-slot-22842688372-3" data-fuse-zone-instance="zone-instance-22842688372-3" data-fuse-slot="fuse-slot-22842688372-3" data-gpid="71161633/PL_plshowroom/video#single-3" data-fuse-processed-at="16177"><div id="fuse-slot-22842688372-1" className="fuse-slot"></div><div id="fuse-slot-22842688372-2" className="fuse-slot"></div><div id="fuse-slot-22842688372-3" className="fuse-slot"></div></div> */}
      <br/>
      <div data-fuse-privacy-tool=""></div>
      <br/>
      <p>
        Spotify was developed as an open source app powered by the
        Spotify/Apple Music Web API. By choosing to use this app, you
        agree to the use of your Spotify account username and data for your top
        artists and tracks.
      </p>
      <br/>
      <p>
        None of the data used by Gramhophone is stored or collected anywhere, and
        it is NOT shared with any third parties. All information is used solely
        for displaying your Receipt.
      </p>
      <br/>
      <p>
        Although you can rest assured that your data is not being stored or used
        maliciously, if you would like to revoke Gramhophone's permissions, you
        can visit
        <a href="http://www.spotify.com/account/apps/?_ga=2.57194153.2059435232.1677244602-1044990631.1616788427">your apps page</a>
        and click "REMOVE ACCESS" on Receiptify.
        <a href="https://support.spotify.com/us/article/spotify-on-other-apps/">Here</a>
        is a more detailed guide for doing so.
      </p>
    </div>
    </>
  )
}

export default Privacypolicy