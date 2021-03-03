// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React, { useState, useEffect } from "react";
import momentDurationFormatSetup from "moment-duration-format";
import useAudioPlayer from "./useAudioPlayer";
import AudioBottom from "./AudioBottom";
import KaraokeBox from "../KaraokeBox";
import AudioTop from "./AudioTop";
import moment from "moment";
import "./style.css"


function AudioPlayer({ userData, setUserData, sessionData, setSessionData, isPlaying, setIsPlaying }) {

    const { curTime, duration, setClickedTime } = useAudioPlayer(isPlaying, setIsPlaying);
    const [language, setLanguage] = useState('en-Us')
    const [pts, setPts] = useState({ pts: 0 })

    const formatDuration = (duration) => {
        return moment
            .duration(duration, "seconds")
            .format("mm:ss", { trim: false });
    }

    const handlePlay = () => {
        console.log('play')
        setSessionData({ ...sessionData, isActive: true })
        setIsPlaying(true)
    }
    // const handlePause = () => {
    //     console.log('pause');
    //     setIsPlaying(false)
    // }

    return (
        <div className="container">

            <AudioTop
                sessionData={sessionData}
            />

            {/* <FileDrop isPlaying={ isPlaying } /> */}

            <KaraokeBox
                pts={pts}
                setPts={setPts}
                curTime={curTime}
                isPlaying={isPlaying}
                language={language}
                sessionData={sessionData}
            />

            {/* <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)} /> */}
            <AudioBottom

                formatDuration={formatDuration}
                sessionData={sessionData}
                handlePlay={handlePlay}
                duration={duration}
                isPlaying={isPlaying}
                curTime={curTime}
                pts={pts}

            />

        </div>
    );
}

export default AudioPlayer;