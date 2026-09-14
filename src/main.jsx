import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import {
  ArrowDown, ArrowLeft, ArrowRight, Check, Heart, ImagePlus,
  Lock, Music2, Pause, Play, RotateCcw, Sparkles, X
} from "lucide-react";
// import { FaInstagram } from "react-icons/fad";


const memories = [
  { date: "วันแรกที่ได้คุยกัน", title: "จากคนแปลกหน้า → คนที่เราอยากรู้จักมากขึ้น", text: "ตอนนั้นเราอาจไม่รู้เลยว่าการคุยกันธรรมดา ๆ จะกลายเป็นความทรงจำที่สำคัญขนาดนี้" },
  { date: "ช่วงเวลาที่มีความสุข", title: "เรื่องเล็ก ๆ ที่เรายังจำได้", text: "เสียงหัวเราะ บทสนทนา เพลงที่เคยฟังด้วยกัน และรายละเอียดเล็ก ๆ ที่ตอนนั้นดูธรรมดา แต่วันนี้กลับมีความหมายมาก" },
  { date: "วันที่เราเริ่มทำร้ายความรู้สึกกัน", title: "ตรงนี้คือสิ่งที่เราอยากรับผิดชอบ", text: "เราไม่ได้อยากย้อนกลับไปเพื่อบอกว่าใครผิดใครถูก แต่อยากยอมรับในส่วนที่เราเคยทำให้เธอเหนื่อยหรือเสียใจ" },
  { date: "วันนี้", title: "เราไม่ได้ขอให้ทุกอย่างกลับไปเหมือนเดิม", text: "ถ้ามีโอกาส เราอยากค่อย ๆ รู้จักเธอใหม่ และพิสูจน์ด้วยการกระทำมากกว่าคำสัญญา" }
];

const photos = [
  "/images/paiting.jpg",
  "/images/mark_nha.jpg",
  "/images/button.JPG",
];

function App() {
  const [started, setStarted] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [response, setResponse] = useState(null);
  // const [photo, setPhoto] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (musicOn) audioRef.current.play().catch(() => setMusicOn(false));
    else audioRef.current.pause();
  }, [musicOn]);

  const chooseResponse = (value) => setResponse(value);

  const prevPhoto = () => setPhotoIndex(i => (i === 0 ? photos.length - 1 : i - 1));
  const nextPhoto = () => setPhotoIndex(i => (i === photos.length - 1 ? 0 : i + 1));


  return (
    <div className="site">
      <audio ref={audioRef} loop src="/midnight_sun.mp3" />

      <div className="grain" />
      <button className="music" onClick={() => setMusicOn(v => !v)} aria-label="เพลง">
        {musicOn ? <Pause size={17}/> : <Music2 size={17}/>}
        <span>{musicOn ? "กำลังเล่น" : "เปิดเพลง"}</span>
      </button>

      {/* logo */}
      <div className="floating-photo">
        <img src="/images/zintear.JPG" alt="รูปประกอบ" />
      </div>
      
      {/* signatures */}
      <div className="signature">
        <span className="sig-ig">
          {/* <FaInstagram className="ig-logo" /> */}
          <span className="rainbow-text">IG: j_r_tha</span>
        </span>
        
        <span className="sig-quote">Khon Thai pen arai gap khon kao?  ( ｡ •̀ ᴖ •́ ｡)</span>
      </div>

      {!started ? (
        <section className="hero landing">
          <div className="orb orb1" /><div className="orb orb2" />
          <div className="hero-content reveal">
            <div className="eyebrow"><Sparkles size={15}/> a little something for you</div>
            <h1>มีบางอย่าง<br/><em>อยากบอกเธอ</em></h1>
            <p className="lead">เราไม่ได้ทำหน้านี้ขึ้นมาเพื่อให้เธอต้องตอบอะไร<br/>แค่อยากให้เธอได้อ่านสิ่งที่เราอยากพูดจริง ๆ</p>
            <button className="primary" onClick={() => setStarted(true)}>
              เปิดดูนะ <ArrowRight size={18}/>
            </button>
            <div className="scroll-hint"><ArrowDown size={15}/> ค่อย ๆ อ่านก็ได้</div>
          </div>
        </section>
      ) : (
        <main>
          <section className="section intro reveal">
            <div className="eyebrow">01 — สิ่งที่เราอยากขอโทษ</div>
            <h2>บางคำขอโทษ<br/><em>ไม่ควรมีคำว่า “แต่” ต่อท้าย</em></h2>
            <div className="letter">
              <Heart className="heart" size={22} fill="currentColor"/>
              <p>เราขอโทษสำหรับวันที่ทำให้เธอรู้สึกว่าเธอต้องอยู่กับทุกอย่างคนเดียว</p>
              <p>ขอโทษสำหรับสิ่งที่เราทำให้เธอต้องคิดมาก เสียใจ หรือไม่มั่นใจในความรู้สึกของเรา</p>
              <p>วันนี้เราไม่ได้อยากอธิบายว่าทำไมเราถึงเป็นแบบนั้น เราแค่อยากยอมรับว่า <strong>มันทำให้เธอเจ็บจริง ๆ</strong></p>
            </div>
          </section>

          <section className="section memories">
            <div className="eyebrow">02 — สิ่งที่เรายังจำได้</div>
            <h2>บางความทรงจำ<br/><em>ยังอยู่ตรงนี้เสมอ</em></h2>
            <div className="photo-box">
              <button className="photo-nav photo-nav-left" onClick={prevPhoto} aria-label="รูปก่อนหน้า">
                <ArrowLeft size={20}/>
              </button>

              <img src={photos[photoIndex]} alt="ความทรงจำ" key={photoIndex} />

              <button className="photo-nav photo-nav-right" onClick={nextPhoto} aria-label="รูปถัดไป">
                <ArrowRight size={20}/>
              </button>

              <div className="photo-dots">
                {photos.map((_, i) => (
                  <span
                    key={i}
                    className={`dot-indicator ${i === photoIndex ? "active" : ""}`}
                    onClick={() => setPhotoIndex(i)}
                  />
                ))}
              </div>
            </div>

            <div className="timeline">
              {memories.map((m, i) => (
                <article className="memory" key={m.date}>
                  <div className="dot">{String(i+1).padStart(2,"0")}</div>
                  <div>
                    <span className="date">{m.date}</span>
                    <h3>{m.title}</h3>
                    <p>{m.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section promise">
            <div className="eyebrow">03 — ถ้ามีโอกาสอีกครั้ง</div>
            <h2>เราไม่อยากกลับไป<br/><em>เป็นเหมือนเดิม</em></h2>
            <p className="big-copy">เราอยากกลับไปเริ่มต้นใหม่<br/>ในแบบที่ดีกว่าเดิม</p>
            <div className="promise-grid">
              <div><Check size={18}/><span> <s>ฟังให้มากกว่าที่พูด</s> เลือกที่จะพูดถึงปัญหา </span></div>
              <div><Check size={18}/><span> ไม่ปล่อยให้ปัญหาค้างอยู่คนเดียว </span></div>
              <div><Check size={18}/><span> พิสูจน์ด้วยการกระทำ </span></div>
              <div><Check size={18}/><span> เคารพความรู้สึกและพื้นที่ของเธอ </span></div>
            </div>
          </section>

          <section className="section final">
            <div className="final-card">
              <Lock size={20}/>
              <div className="eyebrow">04 — ไม่มีคำตอบที่ถูก</div>
              <h2>เธอไม่ต้อง<br/><em>รีบตอบเราก็ได้</em></h2>
              <p>เราไม่รู้ว่าในใจเธอตอนนี้ยังเหลือพื้นที่ให้เราไหม และเราจะไม่บังคับให้เธอต้องกลับมา</p>
              <p>แค่อยากให้รู้ว่า ถ้าวันหนึ่งเธออยากลองคุยกันอีกครั้ง เราจะอยู่ตรงนี้ และครั้งนี้เราอยากค่อย ๆ สร้างความไว้ใจกันใหม่</p>

              {!response ? (
                <div className="response-area">
                  <p className="question">แต่ถ้าเธออยากบอกอะไรกับเรา…</p>
                  <div className="response-buttons">
                    <button className="primary" onClick={() => chooseResponse("talk")}>ลองคุยกันอีกครั้งนะ <Heart size={17}/></button>
                    <button className="secondary" onClick={() => chooseResponse("time")}>ขอเวลาคิดดูก่อน <span>🤍</span></button>
                  </div>
                </div>
              ) : (
                <div className="response-result">
                  <Sparkles size={25}/>
                  {response === "talk" ? (
                    <>
                      <h3>ขอบคุณที่เปิดประตูให้เราอีกครั้ง</h3>
                      <p>เราไม่อยากรีบกลับไปเป็นเหมือนเดิม<br/>แต่อยากค่อย ๆ ทำให้เธอรู้สึกดีและสบายใจอีกครั้ง</p>
                    </>
                  ) : (
                    <>
                      <h3>ได้เลย เราจะไม่เร่งเธอ</h3>
                      <p>ใช้เวลาของเธอให้เต็มที่นะ<br/>ไม่ว่าเธอจะเลือกอะไร เราก็เคารพการตัดสินใจนั้น</p>
                    </>
                  )}
                  <button className="reset" onClick={() => setResponse(null)}><RotateCcw size={15}/> ดูคำตอบอีกครั้ง</button>
                </div>
              )}
            </div>
            <p className="footer-note">made with sincerity · ไม่ต้องตอบวันนี้ก็ได้</p>
          </section>
        </main>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
