import './Home.css';
import { useState } from 'react';
// 재사용 가능한 PosterList 컴포넌트 만들기
const PosterList = ({ professor, posters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shuffledPosters, setShuffledPosters] = useState([...posters]);
  
  const togglePosters = (e) => {
    e.stopPropagation();
    if (!isOpen) {
      // Shuffle posters when opening
      const newShuffledPosters = [...posters].sort(() => Math.random() - 0.5);
      setShuffledPosters(newShuffledPosters);
    }
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="collapsible-container">
      <p 
        className="collapsible-text"
        onClick={togglePosters}
      >
        {professor} 포스터 목록 {isOpen ? '닫기 ▲' : '보기 ▼'} 📋
      </p>
      <div className="poster-list" style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="seating-chart-container">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <div className="terminal-button close-button"></div>
              <div className="terminal-button minimize-button"></div>
              <div className="terminal-button maximize-button"></div>
            </div>
            <span className="terminal-title">Poster Layout - KSMI 2025</span>
          </div>
          <p className="seating-chart"><span className="prompt">$</span>cat poster_layout.txt</p>
          <p className="seating-chart">
            ┌─────────────── Window ───────────────┐</p>
          <p className="seating-chart">
            │  1A □  2A     3A □  4A     5A □  6A  │</p>
          <p className="seating-chart">
            │  1B □  2B     3B □  4B     5B □  6B  │</p>
          <p className="seating-chart">
            │  1C □  2C     3C □  4C     5C □  6C  │</p>
          <p className="seating-chart">
            │  1D □  2D     3D □  4D     5D □  6D  │</p>
          <p className="seating-chart">
            └─────────────── Entrance ─────────────┘</p>
        </div>
        <ul>
          {posters.map((poster, index) => (
            <li key={index}>{poster}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};


function Home() {
  return (
    <div className="home">
      <section className="main-banner">
        <div className="banner-content">
          <img src="/img/banner.png" alt="Banner" className="banner-image" />
        </div>
      </section>
{/* 
      <section className="registration-form">
        <h2>제 1차 KSMI-한국 음악정보학회 심포지엄 사전등록</h2>
        <div className="registration-info">
          <p><strong>등록 기간:</strong> 2025년 4월 13일 일요일 오후 11시 59분까지</p>
          <p><strong>행사 일시:</strong> 2025년 4월 18일 금요일</p>
          <p><strong>행사 장소:</strong> 한국과학기술원 (KAIST) 학술문화관 5F (정근모 컨퍼런스홀 + 존 해너홀)</p>
          <p><strong>결제 방식:</strong> 등록 정보 입력 후, 아래 결제하러가기 버튼 클릭.</p>
          <p><strong>기타 문의:</strong> ksmi2025@gmail.com</p>
          <p><strong>참고:</strong> 등록 정보 입력과 결제를 모두 완료해야지 등록이 완료됩니다.</p>
        </div>

        <button 
            className="submit-button"
            onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSepsvQgfwQe28m_tI4RtVje824hDLKfP8dnF66635GEVJ2k0Q/viewform?usp=sharing', '_blank')}
          >
            Step1. 등록 정보 입력하기
        </button>
        <button 
            className="submit-button"
            onClick={() => window.open('https://music-informatics.kr/payment', '_blank')}
          >
            Step2. 결제 하러가기
        </button>
      </section> */}
{/* 
      <section className="registration-form">
        <h2>제 1차 KSMI-한국 음악정보학회 심포지엄 사전등록</h2>
        <div className="registration-info">
          <p><strong>등록 상태:</strong> 사전등록이 마감되었습니다.</p>
          <p><strong>등록 기간:</strong> 2025년 4월 13일 일요일 오후 11시 59분까지</p>
          <p><strong>행사 일시:</strong> 2025년 4월 18일 금요일</p>
          <p><strong>행사 장소:</strong> 한국과학기술원 (KAIST) 학술문화관 5F (정근모 컨퍼런스홀 + 존 해너홀)</p>
          <p><strong>기타 문의:</strong> ksmi2025@gmail.com</p>
        </div>
        <button 
          className="submit-button"
          disabled
          style={{ opacity: 0.6, cursor: 'not-allowed' }}
        >
          사전등록이 마감되었습니다. 감사합니다.
        </button>
      </section> */}

      <section className="location-section">
        <h2>장소 (Venue)</h2>
        <p><b>학술대회 장소</b>: 한국과학기술원 (KAIST) 학술문화관 5F (정근모 컨퍼런스홀 + 존 해너홀) <a className="link-tag" href="https://naver.me/FjbaurS6">네이버지도</a></p>
        <p><b>저녁 만찬 장소</b>: 한국과학기술원 (KAIST) E15 대강당 <a className="link-tag" href="https://naver.me/xBwfnQQI">네이버지도</a></p>
        <p>학술대회 장소에서 저녁 만찬 장소로 이동하기 <a className="link-tag" href="https://map.naver.com/p/directions/14177966.082903,4351533.5044353,%EC%B9%B4%EC%9D%B4%EC%8A%A4%ED%8A%B8%20%EB%B3%B8%EC%9B%90%20%ED%95%99%EC%88%A0%EB%AC%B8%ED%99%94%EA%B4%80,16097956,PLACE_POI/14177976.5024074,4351949.6679486,%EC%B9%B4%EC%9D%B4%EC%8A%A4%ED%8A%B8%20%EB%B3%B8%EC%9B%90%20%EB%8C%80%EA%B0%95%EB%8B%B9,16098027,PLACE_POI/-/walk?c=17.00,0,0,0,dh">네이버지도</a></p>
        <div className="location-images">
          <img src="/img/library.jpg" alt="도서관 전경" className="location-image" />
          <img src="/img/e15.jpg" alt="E15 건물" className="location-image" />
        </div>
      </section>

      <section className="preview" style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h2>심포지엄 일정</h2>
        
        <h3>10:00 - 10:30: 개회</h3>
        <p>인사말 #1: Prof. Zhiyao Duan (University of Rochester, ISMIR president)<a className="link-tag" href="https://labsites.rochester.edu/air/index.html">Homepage</a></p>
        <p>인사말 #2: Prof. Jinha Lee (University of Washington)<a className="link-tag" href="https://gamer.ischool.uw.edu/">Homepage</a></p>
        
        <h3>10:30 - 11:30: Keynote</h3>
        <p><strong>Advancing Music Experience Through Music Information Research</strong></p>
        <p>Dr. Masataka Goto (Senior Principal Researcher, AIST)<a className="link-tag" href="https://staff.aist.go.jp/m.goto/index-e.html">Homepage</a></p>
        <details>
          <summary className="more-info">Abstract & Bio Details</summary>
          <div className="keynote-details">
            <p><b>Abstract</b></p>
            <p className="details">Music technologies will open up new ways of enjoying music, both in terms of creating and appreciating music. In this keynote, I will discuss how music information research can enrich music experiences by introducing examples of our research outcomes. For example, "Lyric Apps" offer a new form of lyric-driven visual art, dynamically rendering different visual content based on user interaction. After releasing "TextAlive App API", a web-based framework for creating lyric apps, we have held annual programming contests since 2020. Another example is "Kiite Cafe", a web service that allows users to get together virtually to listen to music. It lets users enjoy the same song simultaneously while reacting in real time, creating a shared listening experience. In the future, further advances in music information research will make interactions between people and music more active and enriching.</p>
            
            <p><b>Bio</b></p>
            <p className="details">Masataka Goto received the Doctor of Engineering degree from Waseda University in 1998. He is currently the Senior Principal Researcher at the National Institute of Advanced Industrial Science and Technology (AIST), Japan. Over the past 33 years, he has published more than 350 papers in refereed journals and international conference proceedings and has received 72 awards, including several best paper awards, best presentation awards, the Tenth Japan Academy Medal, and the Tenth JSPS PRIZE. He has served as a committee member of over 140 scientific societies and conferences, including as the General Chair of ISMIR 2009 and 2014. From 2007, he chaired the Special Interest Group on Music and Computer (SIGMUS) under the Information Processing Society of Japan (IPSJ) for two years.</p>
          </div>
        </details>
        
        <h3>11:30 - 12:30: 점심 시간</h3>
        
        <h3>12:30 - 13:30: 연구실 및 기업 소개 세션 #1</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>• MARG, 서울대 (이교구 교수) <a className="link-tag" href='https://marg.snu.ac.kr/'>Homepage</a></li>
          <li>• AIRIS Lab, KAIST (김성영 교수) <a className="link-tag" href='https://airislab.kaist.ac.kr/'>Homepage</a></li>
          <li>• MALer Lab, 서강대 (정다샘 교수) <a className="link-tag" href='https://MALerlab.github.io/'>Homepage</a></li>
          <li>• AAA Lab, 경북대 (이석진 교수) <a className="link-tag" href='https://sites.google.com/view/knuaaalab/home?authuser=0'>Homepage</a></li>
          <li>• 가우디오랩 (전상배 CSO) <a className="link-tag" href='https://www.gaudiolab.com/ko/'>Homepage</a></li>
          <li>• 수퍼톤 (이교구 교수) <a className="link-tag" href='https://www.supertone.ai/ko'>Homepage</a></li>
          <li>• 엠피에이지 (정인서 대표) <a className="link-tag" href='https://www.mpaghq.com/'>Homepage</a></li>
          <li>• 포자랩스 (윤홍규  R&D 팀장) <a className="link-tag" href='https://www.pozalabs.com/'>Homepage</a></li>
        </ul>
        
        <h3>13:30 - 15:00: 학생 포스터 발표 세션 #1</h3>
        <PosterList professor="" posters={[
              "[1-A] MARG 이성호: Reverse Engineering of Music Mixing Graphs with Differentiable Processors and Iterative Pruning",
              "[1-B] MARG 채윤기: Lyrics Generation with Song form-aware Syllable Count Control",
              "[1-C] MARG 정해선: Optimizing Music Captioning with Reinforcement Learning and Retrieval-Augmented Methods",
              "[1-D] MARG 신은식: Synthetic Dataset Generation for String Ensemble Separation",
              "[2-A] MARG 신원철: Improving Synthesizer Sound Matching using Reinforcement Learning",
              "[2-B] MARG 김하윤: Expressive Singing Voice Synthesis",
              "[2-C] MARG 황선태: DOSE : Drum One-Shot Extraction from Music Mixture",
              "[2-D] MARG 이하준: Many-to-Many Timbre Transfer with Interpolation",
              "[3-A] MARG 김수빈: ERP responses of Interval Judgment in the Tritone Paradox",
              "[3-B] MARG 김예진: Drum Generation with Latent Diffusion Models",
              "[3-C] MARG 한동엽: Music Transformer That Mimics Human Compositional Steps",
              "[3-D] MALer 박한나: GAON: Generative AI Offers Notes for your music",
              "[4-A] MALer 김대웅: ViolinDiff: Enhancing Expressive Violin Synthesis with Pitch Bend Conditioning",
              "[4-B] MALer 정종민: Unified Music Representation Translation Across Visual, Symbolic, and Audio Modalities",
              "[4-C] MALer 이다솔: Understanding era gap between the US and Korean music charts using music CNN",
              "[4-D] AIRIS 고부승: Augmented Reality Auditory Training for Selective Auditory Attention Enhancement",
              "[5-A] AIRIS 이강은: Immersive Automatic Audio Panning System Integrated with DAW for Music Production",
              "[5-B] AIRIS 오경택: Aural Heritage: 6DoF Reconstruction of Cultural Heritage Sites",
              "[5-C] AIRIS 박이든: Quantitative and Qualitative Quotients in Music Source Separation: A Cross-Genre Analysis of Acoustic and Perceptual Performance with Emphasis on K-pop",
              "[5-D] AAA 이대호: Enhancement of Automatic Music Transcription Model with Number of Activated Pitch Information",
              "[6-A] NMSL 김예원: Amuse: Human-AI Collaborative Songwriting with Multimodal Inspirations",
              "[6-B] MAC 최은진: On the De-duplication of the Large-scale Symbolic Music Dataset",
              "[6-C] MAC 방하연: PianoBind: A Multimodal Joint Embedding Model for Pop-piano Music"
            ]} />
        <h3>15:00 - 15:15: 휴식</h3>
        
        <h3>15:15 - 16:15: 연구실 및 기업 소개 세션 #2</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>• Belmont University (전성희 교수) <a className="link-tag" href='https://www.belmont.edu/profiles/song-hui-chon/'>Homepage</a></li>
          <li>• University of Illinois at Urbana-Champaign (UIUC) (최가현 교수) <a className="link-tag" href='https://kahyunchoi.com//'>Homepage</a></li>
          <li>• MuBL, KAIST (이경면 교수) <a className="link-tag" href='https://www.mubl.kaist.ac.kr/'>Homepage</a></li>
          <li>• SAPL, GIST (신종원 교수) <a className="link-tag" href='https://sapl.gist.ac.kr/'>Homepage</a></li>
          <li>• MAC Lab, KAIST (남주한 교수) <a className="link-tag" href='https://mac.kaist.ac.kr/'>Homepage</a></li>
          <li>• MEMI Lab, GIST | 크리에이티브마인드 (안창욱 교수) <a className="link-tag" href='https://sites.google.com/view/gist-memi/'>Homepage (MEMI Lab)</a> <a className="link-tag" href='https://creativemind.ai'>Homepage (크리에이티브마인드)</a></li>
          <li>• 뉴튠 (이종필 대표) <a className="link-tag" href='https://www.neutune.com'>Homepage</a></li>
          <li>• SiriusXM/Pandora (김재훈 박사) <a className="link-tag" href='https://www.siriusxm.com/pandora'>Homepage</a></li>
          <li>• Suno (원상희 박사) <a className="link-tag" href='https://suno.com/'>Homepage</a></li>
        </ul>
        
        <h3>16:15 - 17:45: 학생 포스터 발표 세션 #2</h3>
        <PosterList professor="" posters={[
              "[1-A] MAC 김현수: D3RM: A Discrete Diffusion Refinement Model for Piano Transcription",
              "[1-B] MAC 최은진: A Discrete Denoising Diffusion Model for Leadsheet2PianoArrangement",
              "[1-C] MAC 도승헌: Connecting Large Langauge Models and Music",
              "[1-D] MAC 이준원: Controllable Foley Sound Generation from Multimodal Inputs",
              "[2-A] MAC 김기락: 확산 모델을 이용한 표현력 있는 피아노 연주 손 동작 생성",
              "[2-B] MAC 권대용: MusT-RAG: Musical Text Question Answering with Retrieval Augmented Generation",
              "[2-C] MAC 김다빈: Any-to-Any Timbre Transfer with Musical Structure Morphing for Monophonic Instruments",
              "[2-D] MAC 배준형: A Preliminary Expert Interview Study on the Potential for Piano Education Innovation through a Multimodal Data Dashboard",
              "[3-A] MAC 한단비내린: Capturing Repetition and Expression in Korean Folk Singing through Audio-Based Segmentation",
              "[3-B] MAC Daniel Bin: DIPO: Diffusion Inference-Time Partial Optimization for Structure Preserving Content Editing",
              "[3-C] MAC 박새별: Quantitative Analysis of Melodic Similarity in Music Copyright Infringement Cases (Presented at ISMIR 2024)",
              "[3-D] SAPL 손주혜: Band Splitting-based Online Music Source Separation",
              "[4-A] MuBL 김현재: The Emergence of Musicality in Deep Auditory Models: Learning from Non-Musical Natural Sounds",
              "[4-B] MuBL 오은지: A Real-Time EEG Synchrony System for Visualizing Shared Musical Pleasure in Multimedia Performances",
              "[4-C] MuBL 최유진: Avatar-Based Audience Experiences in VR Music Concerts: Flow and Social Bonding",
              "[4-D] MuBL 김효진: Exploring a New Modality for Music Emotion: Emoji-Based Real-Time Chat Data",
              "[5-A] MuBL 송태인: Review : Research on the Musical Emotions of Cochlear Implant Users",
              "[5-B] MEMI 김태현: Multi-Task Learning based Temporal Pattern Matching Network for Guitar Tablature Transcription",
              "[5-C] MARG 정해선: Exploring the Speech-to-Song Illusion: A Comparative Study of Standard Korean and Dialects",
              "[5-D] MARG 이성호: Differentiable Acoustic Radiance Transfer",
              "[6-A] MARG 홍유니스: Revisiting Mismatch Negativity: Additive Neural Processes Across Attention",
              "[6-B] MARG 황새연: When Melody and Lyrics Disagree: A Multimodal Analysis of Emotion in Music",
              "[6-C] MAC 김혜미, 박지윤: A Multi-Track Dataset for MIR Research ",
            ]} />
        <h3>17:45 - 18:00: 폐회 및 기념 촬영</h3>
        
        <h3>18:00 - 20:00: 만찬, 네트워킹 행사</h3>
      </section>
    </div>
  );
}

export default Home; 