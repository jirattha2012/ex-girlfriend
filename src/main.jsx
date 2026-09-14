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
  "/images/button.JPG",
  "/images/a1.PNG",
  "/images/a2.PNG",
  "/images/a3.PNG",
  "/images/a4.PNG",
  "/images/a5.PNG",
  "/images/a6.PNG",
  "/images/a7.PNG",
  "/images/a8.PNG",
  "/images/a9.PNG",
  "/images/a10.PNG",
  "/images/a11.PNG",

  // "/images/paiting.jpg",
  // "/images/couple_shoes.jpg",
  // "/images/waiting_train.jpg",
  // "/images/hbd.jpg",
  // "/images/hbd2.jpg",
  // "/images/mc.jpg",
  // "/images/nippy.jpg",
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

  // false = ปิดปรับปรุงอยู่
  const [showMaintenance, setShowMaintenance] = useState(false); 

  // ย้ายตำแหน่ง button == time 
  const MAX_DODGE = 9;
  const [dodgeCount, setDodgeCount] = useState(0);
  const [dodgeStyle, setDodgeStyle] = useState({});

  // const handleTimeClick = (e) => {
  //   if (dodgeCount < MAX_DODGE) {
  //     const btnWidth = 200;
  //     const btnHeight = 55;
  //     const padding = 20;

  //     const maxX = window.innerWidth - btnWidth - padding;
  //     const maxY = window.innerHeight - btnHeight - padding;

  //     const randomX = padding + Math.random() * maxX;
  //     const randomY = padding + Math.random() * maxY;
  //     const randomRotate = (Math.random() - 0.5) * 40;

  //     setDodgeStyle({
  //       position: "fixed",
  //       left: `${randomX}px`,
  //       top: `${randomY}px`,
  //       transform: `rotate(${randomRotate}deg)`,
  //     });
  //     setDodgeCount(c => c + 1);
  //   } else {
  //     setDodgeStyle({});
  //     chooseResponse("time");
  //   }
  // };

  // function สำหรับจุดพลุ
  const [confetti, setConfetti] = useState([]);

  const fireConfetti = () => {
    const colors = ["#e6bfc0", "#f7e5e3", "#d9ccc5", "#b17878", "#fdf9f4", "#8e5e60"];
    const pieces = Array.from({ length: 60 }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      left: Math.random() * 100,           // % ตำแหน่งซ้าย-ขวา
      delay: Math.random() * 0.3,          // ดีเลย์เริ่มไม่พร้อมกัน
      duration: 2.5 + Math.random() * 1.5, // ความเร็วตกไม่เท่ากัน
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: Math.random() * 360,
      drift: (Math.random() - 0.5) * 200,  // เบี่ยงซ้าย-ขวาตอนตก
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 4200); // เคลียร์ทิ้งหลังเล่นจบ
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const handleTalkClick = () => {
    setShowConfirm(true);
  };

  const confirmTalk = () => {
    setShowConfirm(false);
    fireConfetti();
    chooseResponse("talk");
  };

  // ฟังก์ชันคำนวณว่าสีพื้นหลังนี้ควรใช้ตัวอักษรสีอะไรถึงจะอ่านง่าย
  const getContrastColor = (bgColor) => {
    const match = bgColor.match(/\d+/g);
    if (!match) return "#352d2a"; // fallback สีเข้มเริ่มต้น

    const [r, g, b] = match.map(Number);
    // สูตรคำนวณความสว่างแบบ perceived luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.55 ? "#352d2a" : "#fdf9f4"; // สว่าง→ตัวหนังสือเข้ม, มืด→ตัวหนังสือสว่าง
  };

  const getBackgroundAt = (x, y) => {
    const el = document.elementFromPoint(x, y);
    if (!el) return "rgb(250,247,242)"; // fallback สีพื้นหลังเว็บโดยรวม

    let node = el;
    while (node) {
      const bg = window.getComputedStyle(node).backgroundColor;
      // ข้ามถ้าพื้นหลังโปร่งใส ไล่หา parent ที่มีสีจริงต่อ
      if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
        return bg;
      }
      node = node.parentElement;
    }
    return "rgb(250,247,242)";
  };

  const handleTimeClick = () => {
    if (dodgeCount < MAX_DODGE) {
      const btnWidth = 200;
      const btnHeight = 55;
      const padding = 20;

      const maxX = window.innerWidth - btnWidth - padding;
      const maxY = window.innerHeight - btnHeight - padding;

      const randomX = padding + Math.random() * maxX;
      const randomY = padding + Math.random() * maxY;
      const randomRotate = (Math.random() - 0.5) * 40;

      // เช็คสีพื้นหลังตรงกึ่งกลางตำแหน่งใหม่ที่ปุ่มจะไปอยู่
      const centerX = randomX + btnWidth / 2;
      const centerY = randomY + btnHeight / 2;
      const bgColor = getBackgroundAt(centerX, centerY);
      const textColor = getContrastColor(bgColor);

      setDodgeStyle({
        position: "fixed",
        left: `${randomX}px`,
        top: `${randomY}px`,
        transform: `rotate(${randomRotate}deg)`,
        color: textColor,
        borderColor: textColor,
      });
      setDodgeCount(c => c + 1);
    } else {
      setDodgeStyle({});
      chooseResponse("time");
    }
  };


  


  return (
    <div className="site">
      {/* add matsuri */}
      {confetti.length > 0 && (
        <div className="confetti-layer">
          {confetti.map(p => (
            <span
              key={p.id}
              className="confetti-piece"
              style={{
                left: `${p.left}%`,
                backgroundColor: p.color,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                "--drift": `${p.drift}px`,
                "--rotate": `${p.rotate}deg`,
              }}
            />
          ))}
        </div>
      )}
      
      <audio ref={audioRef} loop src="/midnight_sun.mp3" />

      <div className="grain" />
      <button className="music" onClick={() => setMusicOn(v => !v)} aria-label="เพลง">
        {musicOn ? <Pause size={17}/> : <Music2 size={17}/>}
        <span>{musicOn ? "กำลังเล่น" : "เปิดเพลง"}</span>
      </button>

      {/* signatures */}
      <div className="signature">
        <span className="sig-ig">
          {/* <FaInstagram className="ig-logo" /> */}
          <span className="rainbow-text">IG: j_r_tha</span>
        </span>
        
        <span className="sig-quote">Khon Thai pen arai gap khon kao?  ( ｡ •̀ ᴖ •́ ｡)</span>
      </div>

      {/* logo */}
      <div className="floating-photo">
        <img src="/images/zintear.JPG" alt="logo" />
        {/* <img src="/images/kid.jpg" alt="logo" /> */}
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
                    {/* <button className="primary" onClick={() => chooseResponse("talk")}> */}
                    {/* <button className="primary" onClick={() => setShowMaintenance(true)}> */}
                    <button className="primary" onClick={handleTalkClick}>
                      ลองคุยกันอีกครั้งนะ <Heart size={17}/>                    
                    </button>
                    
                    <button
                      className={`secondary ${dodgeCount > 0 && dodgeCount < 9 ? "dodging" : ""}`}
                      style={dodgeStyle}
                      onMouseEnter={dodgeCount < 9 ? handleTimeClick : undefined}
                      onClick={handleTimeClick}
                    >
                      {dodgeCount >= 9
                        ? "แน่ใจแล้วใช่ไหม?"
                        : dodgeCount >= 8
                          ? "ถามรอบสุดท้ายแล้วนะะ"
                          : <>ขอเวลาคิดดูก่อน <span>🤍</span></>
                      }
                    </button>
                    
                    {/* placeholder แทนที่ตอนปุ่มจริงหลุดออกจาก flow */}
                    {dodgeCount > 0 && dodgeCount < MAX_DODGE && (
                      <span className="secondary-placeholder" aria-hidden="true"></span>
                    )}

                  </div>

                  {showConfirm && (
                    <div className="confirm-popup">
                      <Heart size={22} fill="currentColor"/>
                      <p className="confirm-title">แน่ใจนะ?</p>
                      <p className="confirm-sub">กดแล้วจะไม่มีการกดยกเลิกทีหลังนะ 😳</p>
                      <div className="confirm-buttons">
                        <button className="primary" onClick={confirmTalk}>
                          ใช่ แน่ใจแล้ว <Heart size={15}/>
                        </button>
                        <button className="maintenance-close" onClick={() => setShowConfirm(false)}>
                          <X size={14}/> ขอคิดอีกที
                        </button>
                      </div>
                    </div>
                  )}

                  {showMaintenance && (
                    <div className="maintenance-popup">
                      <span className="maintenance-icon">🚧</span>
                      <p>ปุ่มนี้ปิดปรับปรุงชั่วคราว</p>
                      <p className="maintenance-sub">(ใจเราพร้อมนะ แต่ระบบยังไม่พร้อม 😅 ลองกดปุ่มข้าง ๆ แทนก่อนได้นะ)</p>
                      <p className="maintenance-sub">*โปรดติดต่อแอดมินโปร</p>
                      <button className="maintenance-close" onClick={() => setShowMaintenance(false)}>
                        <X size={14}/> ปิด
                      </button>
                    </div>
                  )}
                </div>
                
              ) : (
                <div className="response-result">
                  <Sparkles size={25}/>
                  {response === "talk" ? (
                    <>
                      <h3>ขอบคุณที่เปิดประตูให้เราอีกครั้ง</h3>
                      <p>เราไม่อยากรีบกลับไปเป็นเหมือนเดิม<br/>แต่อยากค่อย ๆ ทำให้เธอรู้สึกดีและสบายใจอีกครั้ง</p>
                      <p style={{ fontSize: "8px" }}> *cap หน้าจอส่งมาด้วยนะ* </p>
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
