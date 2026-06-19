# Adding a Music Release

The Music page is generated from `data/releases.json`. Do not add track markup to
`music.html`.

1. Add the audio file under `assets/Audio/`.
2. Add the cover image under `assets/images/`.
3. Add one object to the `releases` array in `data/releases.json`.

Use a stable, unique `id`. Saved visitor playlists match releases by this ID, so
do not change an existing ID after publishing it.

```json
{
  "id": "stable-release-id",
  "title": "Release Title",
  "artist": "Callizto Dark Symphony",
  "year": "2026",
  "type": "Single",
  "arc": "Archive arc",
  "coverImage": "assets/images/release-cover.jpg",
  "coverAspect": "portrait",
  "imageAlt": "Descriptive release cover alt text",
  "localAudio": "assets/Audio/release-audio.mp3",
  "lyrics": "Optional lyrics text",
  "story": "Optional story text",
  "info": "Optional version or archive notes",
  "lyricsPending": false,
  "description": "Short archive description"
}
```

`coverAspect` accepts:

- `portrait` for 4:5 release art. This is the default when omitted.
- `wide` for legacy 16:9 artwork. Wide art is contained over a dark blurred backdrop.
- `square` for square artwork.

If `localAudio` is empty or omitted, the release remains visible but is marked
unavailable and skipped during playback. New releases not present in an older
visitor playlist backup are appended in official archive order automatically.
