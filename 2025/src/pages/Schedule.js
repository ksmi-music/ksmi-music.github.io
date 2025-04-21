import { useState } from 'react';
import './Schedule.css';

// 재사용 가능한 PosterList 컴포넌트 만들기
const PosterList = ({ professor, posters }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const togglePosters = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="collapsible-container">
      <p 
        className="collapsible-text"
        onClick={togglePosters}
      >
        {professor} 포스터 목록 {isOpen ? '닫기 ▲' : '보기 ▼'}
      </p>
      <div className="poster-list" style={{ display: isOpen ? 'block' : 'none' }}>
        <ul>
          {posters.map((poster, index) => (
            <li key={index}>{poster}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function Schedule() {
  // State for controlling modal visibility
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    time: '',
    content: null
  });

  // Function to open modal with specific content
  const openModal = (title, time, content) => {
    setModalContent({
      title,
      time,
      content
    });
    setModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="schedule-section">
      <h2 style={{ textAlign: 'center' }}>심포지엄 일정</h2>
      <p className="schedule-intro">🎵 음악과 기술의 만남! 🎹 세션을 클릭하면 상세 내용을 확인할 수 있습니다.</p>
      
      <div className="compact-schedule">
        <div className="schedule-card" onClick={() => openModal('개회', '10:00 - 10:30', 
          <>
            <p className="speaker">인사말 #1: Prof. Zhiyao Duan (University of Rochester, ISMIR president), <a className="link-badge" href='https://labsites.rochester.edu/air/index.html'>Audio Information Research (AIR) lab</a></p>
            
            <p><b>Bio</b></p>
            <p className="details">Zhiyao Duan received his BS in Automation and MS in Control Science and Engineering from Tsinghua University, China, in 2004 and 2008, respectively, and PhD in Computer Science from Northwestern University in 2013. He joined the faculty of the Electrical and Computer Engineering Department as an assistant professor in 2013, and is currently an associate professor in Electrical and Computer Engineering, Computer Science, and Data Science. His research interest is in computer audition and its connections with computer vision, natural language processing, and augmented and virtual reality. He received a best paper award at the SMC 2017, a best paper nomination at ISMIR 2017, and a CAREER award from the National Science Foundation (NSF). His research is funded by NSF, NIH, New York State Center of Excellence in Data Science, and University of Rochester internal awards on AR/VR, health analytics, and data science. He served as a Scientific Program Co-Chair of ISMIR 2021, and is serving as an associate editor for IEEE Open Journal of Signal Processing, a guest editor for Transactions of the International Society for Music Information Retrieval, and a guest editor for Frontiers in Signal Processing. He is the President-Elect of the International Society for Music Information Retrieval (ISMIR)</p>

            <p className="speaker">인사말 #2: Prof. Jinha Lee (University of Washington), <a className="link-badge" href='https://gamer.ischool.uw.edu/'>Game Research Group</a></p>
            
            <p><b>Bio</b></p>
            <p className="details">Jin Ha Lee is a Professor and Associate Dean for Faculty Affairs at the Information School in University of Washington and the director of the GAMER (GAME Research) Group. Her research interests include: music, game, and multimedia information seeking and retrieval, information organization and access, and knowledge representation. The GAMER Group explores new ideas and approaches for organizing and providing access to video games and interactive media, understanding user behavior related to popular cultural materials, and using these materials for informal learning for topics such as misinformation and mental health. She holds an M.S. (2002) and a Ph.D. (2008) from the University of Illinois at Urbana-Champaign.</p>

          </>
        )}>
          <div className="time-badge">10:00</div>
          <h3>개회</h3>
          <div className="schedule-brief">Zhiyao Duan 교수 및 이진하 교수 인사말</div>
        </div>

        <div className="schedule-card keynote" onClick={() => openModal('Keynote', '10:30 - 11:30', 
          <>
            <div className="keynote-details">
              <h4>Advancing Music Experience Through Music Information Research</h4>
              <p className="speaker">Dr. Masataka Goto, Senior Principal Researcher, AIST </p> 

              <p><b>Abstract</b></p>
              <p className="details">Music technologies will open up new ways of enjoying music, both in terms of creating and appreciating music. In this keynote, I will discuss how music information research can enrich music experiences by introducing examples of our research outcomes. For example, "Lyric Apps" offer a new form of lyric-driven visual art, dynamically rendering different visual content based on user interaction. After releasing "TextAlive App API", a web-based framework for creating lyric apps, we have held annual programming contests since 2020. Another example is "Kiite Cafe", a web service that allows users to get together virtually to listen to music. It lets users enjoy the same song simultaneously while reacting in real time, creating a shared listening experience. In the future, further advances in music information research will make interactions between people and music more active and enriching.</p>
              
              <p><b>Bio</b></p>
              <p className="details">Masataka Goto received the Doctor of Engineering degree from Waseda University in 1998. He is currently the Senior Principal Researcher at the National Institute of Advanced Industrial Science and Technology (AIST), Japan. Over the past 33 years, he has published more than 350 papers in refereed journals and international conference proceedings and has received 72 awards, including several best paper awards, best presentation awards, the Tenth Japan Academy Medal, and the Tenth JSPS PRIZE. He has served as a committee member of over 140 scientific societies and conferences, including as the General Chair of ISMIR 2009 and 2014. From 2007, he chaired the Special Interest Group on Music and Computer (SIGMUS) under the Information Processing Society of Japan (IPSJ) for two years.</p>
            </div>
          </>
        )}>
          <div className="time-badge">10:30</div>
          <h3>Keynote</h3>
          <div className="schedule-brief">Dr. Masataka Goto, AIST</div>
        </div>

        <div className="schedule-card break">
          <div className="time-badge">11:30</div>
          <h3>점심 시간</h3>
          <div className="schedule-brief">도시락 제공</div>
        </div>

        <div className="schedule-card" onClick={() => openModal('연구실 및 기업 소개 세션 #1', '12:30 - 13:30', 
          <>
            <p className="speaker"> MARG, 서울대 (이교구 교수) <a className="link-badge" href='https://marg.snu.ac.kr/'>Homepage</a></p>
            <p> Music and Audio Research Group (MARG) at Seoul National University is a highly interdisciplinary research group that tries to address intriguing challenges in music and audio. With digital audio signal processing (DSP) and machine learning (ML) as two main tools, we have been tackling these problems: the best part is, as we learn more about human's auditory perception and cognition, the more interesting problems we discover.</p>
            <p className="speaker"> AIRIS Lab, KAIST (김성영 교수) <a className="link-badge" href='https://airislab.kaist.ac.kr/'>Homepage</a></p>
            <p>AIRIS Lab is home to a team of dedicated researchers and innovators passionate about exploring the boundaries of immersive audio and psychoacoustics. Our mission is to bridge the gap between technological advancements and human auditory perception, creating immersive and holistic sound experiences that resonate with users on a profound level.</p>
            <p className="speaker"> Maler Lab, 서강대 (정다샘 교수) <a className="link-badge" href='https://malerlab.github.io/'>Homepage</a></p>
            <p>Music and Art Learning (MALer) Lab aims to understand music and art computationally, especially through deep learning. Our research interests covers broad music information retrieval including computational modeling of music generation and music performance, computational musicology, and cross-modal generation.</p>
            <p className="speaker"> AAA Lab, 경북대 (이석진 교수) <a className="link-badge" href='https://sites.google.com/view/knuaaalab/home?authuser=0'>Homepage</a></p>
            <p>The researches of Applied Acoustics and Audio (AAA) laboratory are focused on signal processing issues related to generate, transmit, receive, analyze, and control the acoustic signals based on theories of acoustics and human hearing. Our research activities may cover the topics related to audio broadcasting, multichannel sound reproduction, acoustic source separation, music signal analysis, and even ultrasonic and sonar systems. We also welcome any interesting ideas related to acoustic phenomenon in real world.</p>
            <p className="speaker"> 가우디오 (TBA) <a className="link-badge" href='https://www.gaudiolab.com/ko/'>Homepage</a></p>
            <p>가우디오랩은 세계적으로 손꼽히는 오디오 기술을 통해, 여러분께서 전혀 경험해 보지 못했던 새로운 차원의 소리 경험을 제공하는 회사입니다. 메타버스의 완성을 담당하는 스페이셜 오디오(공간음향)와 AI 오디오 기술의 가장 첨단, 그 이상의 경지에서 비교 불가한 오디오 기술의 초격차를 구현해내고 있습니다.</p>
            <p className="speaker"> 수퍼톤 (TBA) <a className="link-badge" href='https://www.supertone.ai/ko'>Homepage</a></p>
            <p>수퍼톤의 슬로건인 "Beyond the Voice"에는 단순히 음성을 모방하는 것 이상으로 선구적인 AI 보이스를 향한 수퍼톤의 헌신이 담겨 있습니다. 수퍼톤의 음성 AI는 목소리를 이해하고, 공명하며, 음성에 힘을 부여합니다. 우리의 기술은 커뮤니케이션을 혁신하고 다양한 분야에 정밀함과 감성적 깊이를 더합니다.</p>
            <p className="speaker"> 엠피에이지 (TBA) <a className="link-badge" href='https://www.mpaghq.com/'>Homepage</a></p>
            <p>MPAG는 모두가 음악을 즐길 수 있는 ​지속가능한 플랫폼을 만듭니다. ​음악에 기술을 더해 새로운 흐름을 만듭니다. 글로벌 음악 생태계에서 우리는 끊임없이 도전하고 연구합니다. ​전세계 이용자들에게 최고의 경험을 제공하고, 최신 기술로 놀라운 성과를 만들고 있습니다.</p>
            <p className="speaker"> 포자랩스 (TBA) <a className="link-badge" href='https://www.pozalabs.com/'>Homepage</a></p>
            <p>포자랩스는 인공지능(AI) 음악 스타트업입니다. 포자랩스는 기존의 곡을 학습하지 않고, 독자적인 음원 데이터를 만들어 인공지능에 학습시켜 음원을 생성하고 있으며 "누구나 쉽게 자신만의 음악을 만들고 소유할 수 있는 세상을 만든다"라는 비전을 가지고 있습니다.</p>
          </>
        )}>
          <div className="time-badge">12:30</div>
          <h3>연구실 및 기업 소개 세션 #1</h3>
          <div className="schedule-brief">4개 연구실, 4개 기업 소개</div>
        </div>

        <div className="schedule-card" onClick={() => openModal('학생 포스터 발표 세션 #1', '13:30 - 15:00', 
          <>
            <p className="speaker">김성영 교수 (AIRIS Lab, KAIST)</p>
            <PosterList professor="AIRIS Lab, KAIST" posters={[
              "Pooseung KOH (고부승): Augmented Reality Auditory Training for Selective Auditory Attention Enhancement",
              "Kangeun LEE (이강은): Immersive Autotmatic Audio Panning System for Music Production",
              "Kyung Taek OH (오경택): Aural Heritage: 6DoF Reconstruction of Cultural Heritage Sites",
              "Yideun PARK (박이든): Quantitative and Qualitative Quotients in Music Source Separation: A Cross-Genre Analysis of Acoustic and Perceptual Performance with Emphasis on K-pop"
            ]} />
            <p className="speaker">이교구 교수 (MARG, 서울대)</p>
            <PosterList professor="MARG, 서울대" posters={[
              "이성호: Reverse Engineering of Music Mixing Graphs with Differentiable Processors and Iterative Pruning",
              "이성호: Differentiable Acoustic Radiance Transfer",
              "채윤기: Song Form-aware Full-Song Text-to-Lyrics Generation with Multi-Level Granularity Syllable Count Control",
              "정해선: Optimizing Music Captioning with Reinforcement Learning and Retrieval-Augmented Methods",
              "정해선: Exploring the Speech-to-Song Illusion: A Comparative Study of Standard Korean and Dialects",
              "신은식: Synthetic Dataset Generation for String Ensemble Separation",
              "신원철: SynthRL: Cross-domain Synthesizer Sound Matching via Reinforcement Learning",
              "김하윤: Expressive Singing Voice Synthesis",
              "황선태: DOSE : Drum One-Shot Extraction from Music Mixture",
              "이하준: Interpolative Timbre Transfer Across Domains",
              "김수빈: ERP responses of Interval Judgment in the Tritone Paradox",
              "김예진: Drum Generation with Latent Diffusion Models",
              "한동엽: Hierarchical Music Transformer for MultiTrack Symbolic Music Generation",
              "홍유니스: Revisiting Mismatch Negativity: Additive Neural Processes Across Attention",
              "황새연: The Analysis of Emotional Alignment between the Melody and Lyrics Extracted from Music"
            ]} />
            <p className="speaker">이석진 교수 (AAA Lab, 경북대)</p>
            <PosterList professor="AAA Lab, 경북대" posters={["이대호: Enhancement of Automatic Music Transcription Model with Number of Activated Pitch Information"]} />
            <p className="speaker">정다샘 교수 (Maler Lab, 서강대)</p>
            <PosterList professor="Maler Lab, 서강대" posters={[
              "박한나(Hannah Park): GAON: Generative AI Offers Notes for your music",
              "김대웅: ViolinDiff: Enhancing Expressive Violin Synthesis with Pitch Bend Conditioning",
              "정종민: Unified Music Translation between Score Images, MusicXML, MIDI and Audio",
              "이다솔: Understanding era gap between the US and Korean music charts using music CNN"
            ]} />
            <p className="speaker">이성주 교수 (NMSL, KAIST)</p>
            <PosterList professor="NMSL, KAIST" posters={[
              "김예원 (Yewon Kim): Amuse: Human-AI Collaborative Songwriting with Multimodal Inspirations"
            ]} />
          </>
        )}>
          <div className="time-badge">13:30</div>
          <h3>학생 포스터 발표 세션 #1</h3>
          <div className="schedule-brief">총 25개 포스터 발표</div>
        </div>

        <div className="schedule-card break" onClick={() => openModal('휴식', '15:00 - 15:15', 
          <>
            <p>Coffee Break</p>
          </>
        )}>
          <div className="time-badge">15:00</div>
          <h3>휴식</h3>
          <div className="schedule-brief">Coffee Break</div>
        </div>

        <div className="schedule-card" onClick={() => openModal('연구실 및 기업 소개 세션 #2', '15:15 - 16:15', 
          <>
            <p className="speaker">MuBL, KAIST (이경면 교수) <a className="link-badge" href='https://www.mubl.kaist.ac.kr/'>Homepage</a></p>
            <p>The place that investigates music and human, we are the Music and Brain Research Lab. We explore various aspects of humans who have evolved to enjoy music through interdisciplinary studies in musicology, brain science, and cognitive science.</p>
            <p className="speaker">SAPL, GIST (신종원 교수) <a className="link-badge" href='https://www.youtube.com/watch?v=ipWoDTcGbMY&ab_channel=GISTAI%EB%8C%80%ED%95%99%EC%9B%90'>Homepage</a></p>
            <p>MSPL에서는 음성통신, 오디오, 음성, 그리고 멀티 모달 신호처리에 중점을 둔 멀티미디어 분야의 다양한 주제를 다룹니다. 신호 특성 및 인지 모델을 기반으로한 신호처리와 신호 모델 및 데이터베이스 정보를 활용한 통계적 접근 방식을 연구해왔고, 최근에는 머신 러닝에 기반한 음성향상, 감정인식, 음원분리 등의 연구를 하고 있습니다.</p>
            <p className="speaker">MEMI Lab, GIST (안창욱 교수) <a className="link-badge" href='https://sites.google.com/view/gist-memi/'>Homepage</a></p>
            <p>"MEMI" conducts in-depth and wide-ranging research from source theory on evolutionary machine intelligence such as evolutionary computing, cluster intelligence, and deep learning to application technology with the aim of "realization of optimal solution of various real world problems". The purpose of this study is to develop new academic paradigm and to improve human welfare.</p>
            <p className="speaker">MAC Lab, KAIST (남주한 교수) <a className="link-badge" href='https://mac.kaist.ac.kr/'>Homepage</a></p>
            <p>The Music and Audio Computing Lab (MACLab) is a music research group in the Graduate School of Culture Technology at KAIST. Our mission is to improve the way people enjoy, play, and create music through technology. We are particularly interested in "Music AI" that can understand music, represent its meanings in a human-friendly manner, and generate new musical content to assist human creativity.</p>
            <p className="speaker"> 크리에이티브마인드 (안창욱 교수) <a className="link-badge" href='https://creativemind.ai'>Homepage</a></p>
            <p>전문 작곡가와 작곡에 진심인 크리에이티브마인드가 만듭니다. 크리에이티브마인드는 전문 작곡가 뿐 아니라 엔지니어까지도 작곡에 진심입니다. 많은 예술인들의 새로운 창작을 돕기 위헤 MUSIA 엔진을 개발하는 것에 힘씁니다. 더 많은 사람들이 MUSIA를 통해 새로운 작곡 아이디어를 얻어 더 편하고 빠르게 작곡을 할 수 있도록 노력합니다. MUSIA 엔진은 기존의 음악 데이터를 학습하지 않고, 음악의 기본 원리 화성학을 학습하여 인간과 같은 방식으로 음악을 작곡합니다. MUSIA와 함께하면 저작권에 방해받지 않는 전혀 새로운 방식의 작곡 아이디어를 얻을 수 있습니다.</p>
            <p className="speaker">MixAudio (TBA) <a className="link-badge" href='https://mix.audio/home'>Homepage</a></p>
            <p>We research advanced AI technology to present the most creative solutions in the music industry. With music and sound, every scene converts content, and everyone becomes the creator. Neutune provides audio assets and AI technology to help creators better tune their musical expressions.</p>
            <p className="speaker">SiriusXM/Pandora (김재훈 박사) <a className="link-badge" href='https://www.siriusxm.com/pandora'>Homepage</a></p>
            <p>SiriusXM is the leading audio entertainment company in North America with a portfolio of audio businesses including its flagship subscription entertainment service SiriusXM; the ad-supported and premium music streaming services of Pandora; an expansive podcast network; and a suite of business and advertising solutions. Reaching a combined monthly audience of approximately 150 million listeners, SiriusXM offers a broad range of content for listeners everywhere they tune in with a diverse mix of live, on-demand, and curated programming across music, talk, news, and sports.</p>
            <p className="speaker">Suno (원상희 박사) <a className="link-badge" href='https://suno.com/'>Homepage</a></p>
            <p>Suno is building a future where anyone can make great music. Whether you're a shower singer or a charting artist, we break barriers between you and the song you dream of making. No instrument needed, just imagination. From your mind to music.</p>
          </>
        )}>
          <div className="time-badge">15:15</div>
          <h3>연구실 및 기업 소개 세션 #2</h3>
          <div className="schedule-brief">4개 연구실, 4개 기업 소개</div>
        </div>

        <div className="schedule-card" onClick={() => openModal('학생 포스터 발표 세션 #2', '16:15 - 17:45', 
          <>
            <p className="speaker">이경면 교수 (MuBL, KAIST)</p>
            <PosterList professor="MuBL, KAIST" posters={[
              "김현재: The Emergence of Musicality in Deep Auditory Models: Learning from Non-Musical Natural Sounds",
              "오은지: A Real-Time EEG Synchrony System for Visualizing Shared Musical Pleasure",
              "최유진: Avatar-Based Audience Experiences in VR Music Concerts: Flow and Social Bonding",
              "김효진: Exploring a New Modality for Music Emotion: Emoji-Based Real-Time Chat Data",
              "송태인: Review : Research on the Musical Emotions of Cochlear Implant Users"
            ]} />
            <p className="speaker">신종원 교수 (SAPL, GIST)</p>
            <PosterList professor="SAPL, GIST" posters={["손주혜: Band Splitting-based Online Music Source Separation"]} />
            <p className="speaker">안창욱 교수 (MEMI Lab, GIST)</p>
            <PosterList professor="MEMI Lab, GIST" posters={["Taehyeon Kim (김태현): Multi-Task Learning based Temporal Pattern Matching Network for Guitar Tablature Transcription"]} />
            <p className="speaker">남주한 교수 (MAC Lab, KAIST)</p>
            <PosterList professor="MAC Lab, KAIST" posters={["김현수 (Hounsu Kim): D3RM: A Discrete Diffusion Refinement Model for Piano Transcription", "최은진 (Eunjin Choi): D3PIA: A Discrete Denoising Diffusion Model for Piano Accompaniment Generation", "최은진 (Eunjin Choi): On the de-duplication of the Lakh MIDI dataset", "방하연 (Hayeon Bang): PianoBind: A Multimodal Joint Embedding Model for Pop-piano Music", "도승헌 (SeungHeon Doh): Connecting Large Langauge Models and Music", "이준원 (Junwon Lee): Controllable Foley Sound Generation from Multimodal Inputs", "김기락 (Kirak Kim): Pianist Hand Motion Generation using Diffusion Models", "권대용 (Daeyong Kwon): MusT-RAG: Musical Text Question Answering with Retrieval Augmented Generation", "김다빈 (Dabin Kim): Timbre Transfer for Monophonic Musical Instruments with Text-to-Audio Diffusion Models", "배준형 (Joonhyung Bae): A Web-Based Dashboard for Integrated Analysis and Visualization of Multimodal Piano Performance Data", "한단비내린 (Danbinaerin Han): Audio-based repeated melodic phrases in Korean folk singing recordings", "다니엘 빈 슈미드 (Daniel Bīn Schmid): DIPO: Diffusion Inference-Time Partial Optimization for Structure Preserving Content Editing", "박새별 (Saebyul Park): Quantitative Analysis of Melodic Similarity in Music Copyright Infringement Cases"]} />
          </>
        )}>
          <div className="time-badge">16:15</div>
          <h3>학생 포스터 발표 세션 #2</h3>
          <div className="schedule-brief">총 20개 포스터 발표</div>
        </div>

        <div className="schedule-card" onClick={() => openModal('폐회 및 기념 촬영', '17:45 - 18:00', 
          <>
            <p>심포지엄 단체 사진 촬영이 있을 예정입니다.</p>
          </>
        )}>
          <div className="time-badge">17:45</div>
          <h3>폐회 및 기념 촬영</h3>
          <div className="schedule-brief">단체 사진 촬영</div>
        </div>

        <div className="schedule-card" onClick={() => openModal('만찬, 네트워킹 행사', '18:00 - 20:00', 
          <>
            <p>저녁 식사와 함께하는 네트워킹 시간입니다.</p>
          </>
        )}>
          <div className="time-badge">18:00</div>
          <h3>만찬, 네트워킹 행사</h3>
          <div className="schedule-brief">저녁 만찬 및 교류</div>
        </div>
      </div>

      {/* Modal Component */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalContent.title}</h2>
              <div className="modal-time">{modalContent.time}</div>
              <button className="close-button" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              {modalContent.content}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Schedule; 