import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import KoreaMap from './components/KoreaMap';
import SeoulMap from './components/SeoulMap';
import DataList from './components/DataList';
import Main from './components/Main';
import Weather from './components/Weather';
import KakaoLogin from './components/KakaoLogin';
import Redirection from './components/Redirection';
import GoogleLogin from './components/GoogleLogin';
import Redirection2 from './components/Redirection2';
import NaverLogin from './components/NaverLogin';
import Redirection3 from './components/Redirection3';
import KaKao1 from './components/Kakao1';
import EtcPage from './components/EtcPage';
import LiveData from './components/LiveData';
import MapData from './components/MapData';
import News from './components/News';
import TTT from './components/TTT';
import Shorts from './components/Shorts';
import SearchBar from './components/SearchBar';
import Video from './components/Video';
import Chatbot from './components/Chatbot';
import CardNews from './components/CardNews';
import ParticleSystem from './components/DustGPU';
import FaceRecognition from './components/FaceRecognition';



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/main' element={<Main/>}/>
          <Route path="/api/data" element={<SeoulMap />}/>
          <Route path="/api/data" element={<KoreaMap />}/>
          <Route path="/download" element={<DataList />} />
          <Route path='/weather' element={<Weather/>} />
          <Route path='/api' element={<KaKao1/>} />
          <Route path='/data' element={<EtcPage/>} />
          <Route path='/livedata' element={<LiveData/>} />
          <Route path='/mapdata' element={<MapData/>} />
          <Route path='/news' element={<News/>} />
          <Route path='/shorts' element={<Shorts/>} />
          <Route path='/searchBar' element={<SearchBar/>} />
          <Route path='/video' element={<Video/>} />
          <Route path='/chatbot' element={<Chatbot/>} />
          <Route path='/cardnews' element={<CardNews/>} />
          <Route path='/dustgpu' element={<ParticleSystem/>} />
          <Route path='/login' element={<TTT/>} />
          <Route path='/kakao' element={<KakaoLogin/>}/>
          <Route path='/kakao/callback' element={<Redirection/>}/>
          <Route path='/google' element={<GoogleLogin/>}/>
          <Route path='/google/callback' element={<Redirection2/>}/>
          <Route path='/naver' element={<NaverLogin/>}/>
          <Route path='/naver/callback' element={<Redirection3/>}/>
          <Route path='a' element={<FaceRecognition/>}/>
          {/* <Route path='b' element={<WebcamStream/>}/> */}
        </Routes>
      </BrowserRouter>


    </div>
  );
}


export default App;
