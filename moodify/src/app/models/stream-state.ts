export interface StreamState {
    currentSoundSrc: string;
    playing: boolean;
    readableCurrentTime: string;
    readableDuration: string;
    duration: number;
    currentTime: number;
    canplay: boolean;
    error: boolean;
}
