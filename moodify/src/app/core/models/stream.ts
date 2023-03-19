import { Observable } from "rxjs";

export interface Stream {
    audio: HTMLAudioElement;
    observable: Observable<Event>;
}