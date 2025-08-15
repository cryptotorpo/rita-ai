(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [402],
  {
    1435: function (e, t, n) {
      var r, i, o, s, a, l, u, d, c, h, p, f, m, g, v;
      ((i = function () {
        this.init();
      }).prototype = {
        init: function () {
          var e = this || o;
          return (
            (e._counter = 1e3),
            (e._html5AudioPool = []),
            (e.html5PoolSize = 10),
            (e._codecs = {}),
            (e._howls = []),
            (e._muted = !1),
            (e._volume = 1),
            (e._canPlayEvent = "canplaythrough"),
            (e._navigator =
              "undefined" != typeof window && window.navigator
                ? window.navigator
                : null),
            (e.masterGain = null),
            (e.noAudio = !1),
            (e.usingWebAudio = !0),
            (e.autoSuspend = !0),
            (e.ctx = null),
            (e.autoUnlock = !0),
            e._setup(),
            e
          );
        },
        volume: function (e) {
          var t = this || o;
          if (
            ((e = parseFloat(e)),
            t.ctx || p(),
            void 0 !== e && e >= 0 && e <= 1)
          ) {
            if (((t._volume = e), t._muted)) return t;
            t.usingWebAudio &&
              t.masterGain.gain.setValueAtTime(e, o.ctx.currentTime);
            for (var n = 0; n < t._howls.length; n++)
              if (!t._howls[n]._webAudio)
                for (
                  var r = t._howls[n]._getSoundIds(), i = 0;
                  i < r.length;
                  i++
                ) {
                  var s = t._howls[n]._soundById(r[i]);
                  s && s._node && (s._node.volume = s._volume * e);
                }
            return t;
          }
          return t._volume;
        },
        mute: function (e) {
          var t = this || o;
          t.ctx || p(),
            (t._muted = e),
            t.usingWebAudio &&
              t.masterGain.gain.setValueAtTime(
                e ? 0 : t._volume,
                o.ctx.currentTime
              );
          for (var n = 0; n < t._howls.length; n++)
            if (!t._howls[n]._webAudio)
              for (
                var r = t._howls[n]._getSoundIds(), i = 0;
                i < r.length;
                i++
              ) {
                var s = t._howls[n]._soundById(r[i]);
                s && s._node && (s._node.muted = !!e || s._muted);
              }
          return t;
        },
        stop: function () {
          for (var e = this || o, t = 0; t < e._howls.length; t++)
            e._howls[t].stop();
          return e;
        },
        unload: function () {
          for (var e = this || o, t = e._howls.length - 1; t >= 0; t--)
            e._howls[t].unload();
          return (
            e.usingWebAudio &&
              e.ctx &&
              void 0 !== e.ctx.close &&
              (e.ctx.close(), (e.ctx = null), p()),
            e
          );
        },
        codecs: function (e) {
          return (this || o)._codecs[e.replace(/^x-/, "")];
        },
        _setup: function () {
          var e = this || o;
          if (
            ((e.state = (e.ctx && e.ctx.state) || "suspended"),
            e._autoSuspend(),
            !e.usingWebAudio)
          ) {
            if ("undefined" != typeof Audio)
              try {
                var t = new Audio();
                void 0 === t.oncanplaythrough && (e._canPlayEvent = "canplay");
              } catch (t) {
                e.noAudio = !0;
              }
            else e.noAudio = !0;
          }
          try {
            var t = new Audio();
            t.muted && (e.noAudio = !0);
          } catch (e) {}
          return e.noAudio || e._setupCodecs(), e;
        },
        _setupCodecs: function () {
          var e = this || o,
            t = null;
          try {
            t = "undefined" != typeof Audio ? new Audio() : null;
          } catch (t) {
            return e;
          }
          if (!t || "function" != typeof t.canPlayType) return e;
          var n = t.canPlayType("audio/mpeg;").replace(/^no$/, ""),
            r = e._navigator ? e._navigator.userAgent : "",
            i = r.match(/OPR\/(\d+)/g),
            s = i && 33 > parseInt(i[0].split("/")[1], 10),
            a = -1 !== r.indexOf("Safari") && -1 === r.indexOf("Chrome"),
            l = r.match(/Version\/(.*?) /),
            u = a && l && 15 > parseInt(l[1], 10);
          return (
            (e._codecs = {
              mp3: !!(
                !s &&
                (n || t.canPlayType("audio/mp3;").replace(/^no$/, ""))
              ),
              mpeg: !!n,
              opus: !!t
                .canPlayType('audio/ogg; codecs="opus"')
                .replace(/^no$/, ""),
              ogg: !!t
                .canPlayType('audio/ogg; codecs="vorbis"')
                .replace(/^no$/, ""),
              oga: !!t
                .canPlayType('audio/ogg; codecs="vorbis"')
                .replace(/^no$/, ""),
              wav: !!(
                t.canPlayType('audio/wav; codecs="1"') ||
                t.canPlayType("audio/wav")
              ).replace(/^no$/, ""),
              aac: !!t.canPlayType("audio/aac;").replace(/^no$/, ""),
              caf: !!t.canPlayType("audio/x-caf;").replace(/^no$/, ""),
              m4a: !!(
                t.canPlayType("audio/x-m4a;") ||
                t.canPlayType("audio/m4a;") ||
                t.canPlayType("audio/aac;")
              ).replace(/^no$/, ""),
              m4b: !!(
                t.canPlayType("audio/x-m4b;") ||
                t.canPlayType("audio/m4b;") ||
                t.canPlayType("audio/aac;")
              ).replace(/^no$/, ""),
              mp4: !!(
                t.canPlayType("audio/x-mp4;") ||
                t.canPlayType("audio/mp4;") ||
                t.canPlayType("audio/aac;")
              ).replace(/^no$/, ""),
              weba: !!(
                !u &&
                t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
              ),
              webm: !!(
                !u &&
                t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
              ),
              dolby: !!t
                .canPlayType('audio/mp4; codecs="ec-3"')
                .replace(/^no$/, ""),
              flac: !!(
                t.canPlayType("audio/x-flac;") || t.canPlayType("audio/flac;")
              ).replace(/^no$/, ""),
            }),
            e
          );
        },
        _unlockAudio: function () {
          var e = this || o;
          if (!e._audioUnlocked && e.ctx) {
            (e._audioUnlocked = !1),
              (e.autoUnlock = !1),
              e._mobileUnloaded ||
                44100 === e.ctx.sampleRate ||
                ((e._mobileUnloaded = !0), e.unload()),
              (e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050));
            var t = function (n) {
              for (; e._html5AudioPool.length < e.html5PoolSize; )
                try {
                  var r = new Audio();
                  (r._unlocked = !0), e._releaseHtml5Audio(r);
                } catch (t) {
                  e.noAudio = !0;
                  break;
                }
              for (var i = 0; i < e._howls.length; i++)
                if (!e._howls[i]._webAudio)
                  for (
                    var o = e._howls[i]._getSoundIds(), s = 0;
                    s < o.length;
                    s++
                  ) {
                    var a = e._howls[i]._soundById(o[s]);
                    a &&
                      a._node &&
                      !a._node._unlocked &&
                      ((a._node._unlocked = !0), a._node.load());
                  }
              e._autoResume();
              var l = e.ctx.createBufferSource();
              (l.buffer = e._scratchBuffer),
                l.connect(e.ctx.destination),
                void 0 === l.start ? l.noteOn(0) : l.start(0),
                "function" == typeof e.ctx.resume && e.ctx.resume(),
                (l.onended = function () {
                  l.disconnect(0),
                    (e._audioUnlocked = !0),
                    document.removeEventListener("touchstart", t, !0),
                    document.removeEventListener("touchend", t, !0),
                    document.removeEventListener("click", t, !0),
                    document.removeEventListener("keydown", t, !0);
                  for (var n = 0; n < e._howls.length; n++)
                    e._howls[n]._emit("unlock");
                });
            };
            return (
              document.addEventListener("touchstart", t, !0),
              document.addEventListener("touchend", t, !0),
              document.addEventListener("click", t, !0),
              document.addEventListener("keydown", t, !0),
              e
            );
          }
        },
        _obtainHtml5Audio: function () {
          var e = this || o;
          if (e._html5AudioPool.length) return e._html5AudioPool.pop();
          var t = new Audio().play();
          return (
            t &&
              "undefined" != typeof Promise &&
              (t instanceof Promise || "function" == typeof t.then) &&
              t.catch(function () {
                console.warn(
                  "HTML5 Audio pool exhausted, returning potentially locked audio object."
                );
              }),
            new Audio()
          );
        },
        _releaseHtml5Audio: function (e) {
          var t = this || o;
          return e._unlocked && t._html5AudioPool.push(e), t;
        },
        _autoSuspend: function () {
          var e = this;
          if (
            e.autoSuspend &&
            e.ctx &&
            void 0 !== e.ctx.suspend &&
            o.usingWebAudio
          ) {
            for (var t = 0; t < e._howls.length; t++)
              if (e._howls[t]._webAudio) {
                for (var n = 0; n < e._howls[t]._sounds.length; n++)
                  if (!e._howls[t]._sounds[n]._paused) return e;
              }
            return (
              e._suspendTimer && clearTimeout(e._suspendTimer),
              (e._suspendTimer = setTimeout(function () {
                if (e.autoSuspend) {
                  (e._suspendTimer = null), (e.state = "suspending");
                  var t = function () {
                    (e.state = "suspended"),
                      e._resumeAfterSuspend &&
                        (delete e._resumeAfterSuspend, e._autoResume());
                  };
                  e.ctx.suspend().then(t, t);
                }
              }, 3e4)),
              e
            );
          }
        },
        _autoResume: function () {
          var e = this;
          if (e.ctx && void 0 !== e.ctx.resume && o.usingWebAudio)
            return (
              "running" === e.state &&
              "interrupted" !== e.ctx.state &&
              e._suspendTimer
                ? (clearTimeout(e._suspendTimer), (e._suspendTimer = null))
                : "suspended" === e.state ||
                  ("running" === e.state && "interrupted" === e.ctx.state)
                ? (e.ctx.resume().then(function () {
                    e.state = "running";
                    for (var t = 0; t < e._howls.length; t++)
                      e._howls[t]._emit("resume");
                  }),
                  e._suspendTimer &&
                    (clearTimeout(e._suspendTimer), (e._suspendTimer = null)))
                : "suspending" === e.state && (e._resumeAfterSuspend = !0),
              e
            );
        },
      }),
        (o = new i()),
        ((s = function (e) {
          if (!e.src || 0 === e.src.length) {
            console.error(
              "An array of source files must be passed with any new Howl."
            );
            return;
          }
          this.init(e);
        }).prototype = {
          init: function (e) {
            var t = this;
            return (
              o.ctx || p(),
              (t._autoplay = e.autoplay || !1),
              (t._format = "string" != typeof e.format ? e.format : [e.format]),
              (t._html5 = e.html5 || !1),
              (t._muted = e.mute || !1),
              (t._loop = e.loop || !1),
              (t._pool = e.pool || 5),
              (t._preload =
                ("boolean" != typeof e.preload && "metadata" !== e.preload) ||
                e.preload),
              (t._rate = e.rate || 1),
              (t._sprite = e.sprite || {}),
              (t._src = "string" != typeof e.src ? e.src : [e.src]),
              (t._volume = void 0 !== e.volume ? e.volume : 1),
              (t._xhr = {
                method: e.xhr && e.xhr.method ? e.xhr.method : "GET",
                headers: e.xhr && e.xhr.headers ? e.xhr.headers : null,
                withCredentials:
                  !!e.xhr && !!e.xhr.withCredentials && e.xhr.withCredentials,
              }),
              (t._duration = 0),
              (t._state = "unloaded"),
              (t._sounds = []),
              (t._endTimers = {}),
              (t._queue = []),
              (t._playLock = !1),
              (t._onend = e.onend ? [{ fn: e.onend }] : []),
              (t._onfade = e.onfade ? [{ fn: e.onfade }] : []),
              (t._onload = e.onload ? [{ fn: e.onload }] : []),
              (t._onloaderror = e.onloaderror ? [{ fn: e.onloaderror }] : []),
              (t._onplayerror = e.onplayerror ? [{ fn: e.onplayerror }] : []),
              (t._onpause = e.onpause ? [{ fn: e.onpause }] : []),
              (t._onplay = e.onplay ? [{ fn: e.onplay }] : []),
              (t._onstop = e.onstop ? [{ fn: e.onstop }] : []),
              (t._onmute = e.onmute ? [{ fn: e.onmute }] : []),
              (t._onvolume = e.onvolume ? [{ fn: e.onvolume }] : []),
              (t._onrate = e.onrate ? [{ fn: e.onrate }] : []),
              (t._onseek = e.onseek ? [{ fn: e.onseek }] : []),
              (t._onunlock = e.onunlock ? [{ fn: e.onunlock }] : []),
              (t._onresume = []),
              (t._webAudio = o.usingWebAudio && !t._html5),
              void 0 !== o.ctx && o.ctx && o.autoUnlock && o._unlockAudio(),
              o._howls.push(t),
              t._autoplay &&
                t._queue.push({
                  event: "play",
                  action: function () {
                    t.play();
                  },
                }),
              t._preload && "none" !== t._preload && t.load(),
              t
            );
          },
          load: function () {
            var e,
              t,
              n = null;
            if (o.noAudio) {
              this._emit("loaderror", null, "No audio support.");
              return;
            }
            "string" == typeof this._src && (this._src = [this._src]);
            for (var r = 0; r < this._src.length; r++) {
              if (this._format && this._format[r]) e = this._format[r];
              else {
                if ("string" != typeof (t = this._src[r])) {
                  this._emit(
                    "loaderror",
                    null,
                    "Non-string found in selected audio sources - ignoring."
                  );
                  continue;
                }
                (e = /^data:audio\/([^;,]+);/i.exec(t)) ||
                  (e = /\.([^.]+)$/.exec(t.split("?", 1)[0])),
                  e && (e = e[1].toLowerCase());
              }
              if (
                (e ||
                  console.warn(
                    'No file extension was found. Consider using the "format" property or specify an extension.'
                  ),
                e && o.codecs(e))
              ) {
                n = this._src[r];
                break;
              }
            }
            if (!n) {
              this._emit(
                "loaderror",
                null,
                "No codec support for selected audio sources."
              );
              return;
            }
            return (
              (this._src = n),
              (this._state = "loading"),
              "https:" === window.location.protocol &&
                "http:" === n.slice(0, 5) &&
                ((this._html5 = !0), (this._webAudio = !1)),
              new a(this),
              this._webAudio && u(this),
              this
            );
          },
          play: function (e, t) {
            var n = this,
              r = null;
            if ("number" == typeof e) (r = e), (e = null);
            else if (
              "string" == typeof e &&
              "loaded" === n._state &&
              !n._sprite[e]
            )
              return null;
            else if (void 0 === e && ((e = "__default"), !n._playLock)) {
              for (var i = 0, s = 0; s < n._sounds.length; s++)
                n._sounds[s]._paused &&
                  !n._sounds[s]._ended &&
                  (i++, (r = n._sounds[s]._id));
              1 === i ? (e = null) : (r = null);
            }
            var a = r ? n._soundById(r) : n._inactiveSound();
            if (!a) return null;
            if (
              (r && !e && (e = a._sprite || "__default"), "loaded" !== n._state)
            ) {
              (a._sprite = e), (a._ended = !1);
              var l = a._id;
              return (
                n._queue.push({
                  event: "play",
                  action: function () {
                    n.play(l);
                  },
                }),
                l
              );
            }
            if (r && !a._paused) return t || n._loadQueue("play"), a._id;
            n._webAudio && o._autoResume();
            var u = Math.max(0, a._seek > 0 ? a._seek : n._sprite[e][0] / 1e3),
              d = Math.max(0, (n._sprite[e][0] + n._sprite[e][1]) / 1e3 - u),
              c = (1e3 * d) / Math.abs(a._rate),
              h = n._sprite[e][0] / 1e3,
              p = (n._sprite[e][0] + n._sprite[e][1]) / 1e3;
            (a._sprite = e), (a._ended = !1);
            var f = function () {
              (a._paused = !1),
                (a._seek = u),
                (a._start = h),
                (a._stop = p),
                (a._loop = !!(a._loop || n._sprite[e][2]));
            };
            if (u >= p) {
              n._ended(a);
              return;
            }
            var m = a._node;
            if (n._webAudio) {
              var g = function () {
                (n._playLock = !1), f(), n._refreshBuffer(a);
                var e = a._muted || n._muted ? 0 : a._volume;
                m.gain.setValueAtTime(e, o.ctx.currentTime),
                  (a._playStart = o.ctx.currentTime),
                  void 0 === m.bufferSource.start
                    ? a._loop
                      ? m.bufferSource.noteGrainOn(0, u, 86400)
                      : m.bufferSource.noteGrainOn(0, u, d)
                    : a._loop
                    ? m.bufferSource.start(0, u, 86400)
                    : m.bufferSource.start(0, u, d),
                  c !== 1 / 0 &&
                    (n._endTimers[a._id] = setTimeout(n._ended.bind(n, a), c)),
                  t ||
                    setTimeout(function () {
                      n._emit("play", a._id), n._loadQueue();
                    }, 0);
              };
              "running" === o.state && "interrupted" !== o.ctx.state
                ? g()
                : ((n._playLock = !0),
                  n.once("resume", g),
                  n._clearTimer(a._id));
            } else {
              var v = function () {
                (m.currentTime = u),
                  (m.muted = a._muted || n._muted || o._muted || m.muted),
                  (m.volume = a._volume * o.volume()),
                  (m.playbackRate = a._rate);
                try {
                  var r = m.play();
                  if (
                    (r &&
                    "undefined" != typeof Promise &&
                    (r instanceof Promise || "function" == typeof r.then)
                      ? ((n._playLock = !0),
                        f(),
                        r
                          .then(function () {
                            (n._playLock = !1),
                              (m._unlocked = !0),
                              t ? n._loadQueue() : n._emit("play", a._id);
                          })
                          .catch(function () {
                            (n._playLock = !1),
                              n._emit(
                                "playerror",
                                a._id,
                                "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."
                              ),
                              (a._ended = !0),
                              (a._paused = !0);
                          }))
                      : t || ((n._playLock = !1), f(), n._emit("play", a._id)),
                    (m.playbackRate = a._rate),
                    m.paused)
                  ) {
                    n._emit(
                      "playerror",
                      a._id,
                      "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."
                    );
                    return;
                  }
                  "__default" !== e || a._loop
                    ? (n._endTimers[a._id] = setTimeout(n._ended.bind(n, a), c))
                    : ((n._endTimers[a._id] = function () {
                        n._ended(a),
                          m.removeEventListener(
                            "ended",
                            n._endTimers[a._id],
                            !1
                          );
                      }),
                      m.addEventListener("ended", n._endTimers[a._id], !1));
                } catch (e) {
                  n._emit("playerror", a._id, e);
                }
              };
              "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" ===
                m.src && ((m.src = n._src), m.load());
              var y =
                (window && window.ejecta) ||
                (!m.readyState && o._navigator.isCocoonJS);
              if (m.readyState >= 3 || y) v();
              else {
                (n._playLock = !0), (n._state = "loading");
                var _ = function () {
                  (n._state = "loaded"),
                    v(),
                    m.removeEventListener(o._canPlayEvent, _, !1);
                };
                m.addEventListener(o._canPlayEvent, _, !1),
                  n._clearTimer(a._id);
              }
            }
            return a._id;
          },
          pause: function (e) {
            var t = this;
            if ("loaded" !== t._state || t._playLock)
              return (
                t._queue.push({
                  event: "pause",
                  action: function () {
                    t.pause(e);
                  },
                }),
                t
              );
            for (var n = t._getSoundIds(e), r = 0; r < n.length; r++) {
              t._clearTimer(n[r]);
              var i = t._soundById(n[r]);
              if (
                i &&
                !i._paused &&
                ((i._seek = t.seek(n[r])),
                (i._rateSeek = 0),
                (i._paused = !0),
                t._stopFade(n[r]),
                i._node)
              ) {
                if (t._webAudio) {
                  if (!i._node.bufferSource) continue;
                  void 0 === i._node.bufferSource.stop
                    ? i._node.bufferSource.noteOff(0)
                    : i._node.bufferSource.stop(0),
                    t._cleanBuffer(i._node);
                } else
                  (isNaN(i._node.duration) && i._node.duration !== 1 / 0) ||
                    i._node.pause();
              }
              arguments[1] || t._emit("pause", i ? i._id : null);
            }
            return t;
          },
          stop: function (e, t) {
            var n = this;
            if ("loaded" !== n._state || n._playLock)
              return (
                n._queue.push({
                  event: "stop",
                  action: function () {
                    n.stop(e);
                  },
                }),
                n
              );
            for (var r = n._getSoundIds(e), i = 0; i < r.length; i++) {
              n._clearTimer(r[i]);
              var o = n._soundById(r[i]);
              o &&
                ((o._seek = o._start || 0),
                (o._rateSeek = 0),
                (o._paused = !0),
                (o._ended = !0),
                n._stopFade(r[i]),
                o._node &&
                  (n._webAudio
                    ? o._node.bufferSource &&
                      (void 0 === o._node.bufferSource.stop
                        ? o._node.bufferSource.noteOff(0)
                        : o._node.bufferSource.stop(0),
                      n._cleanBuffer(o._node))
                    : (isNaN(o._node.duration) && o._node.duration !== 1 / 0) ||
                      ((o._node.currentTime = o._start || 0),
                      o._node.pause(),
                      o._node.duration === 1 / 0 && n._clearSound(o._node))),
                t || n._emit("stop", o._id));
            }
            return n;
          },
          mute: function (e, t) {
            var n = this;
            if ("loaded" !== n._state || n._playLock)
              return (
                n._queue.push({
                  event: "mute",
                  action: function () {
                    n.mute(e, t);
                  },
                }),
                n
              );
            if (void 0 === t) {
              if ("boolean" != typeof e) return n._muted;
              n._muted = e;
            }
            for (var r = n._getSoundIds(t), i = 0; i < r.length; i++) {
              var s = n._soundById(r[i]);
              s &&
                ((s._muted = e),
                s._interval && n._stopFade(s._id),
                n._webAudio && s._node
                  ? s._node.gain.setValueAtTime(
                      e ? 0 : s._volume,
                      o.ctx.currentTime
                    )
                  : s._node && (s._node.muted = !!o._muted || e),
                n._emit("mute", s._id));
            }
            return n;
          },
          volume: function () {
            var e,
              t,
              n,
              r = this,
              i = arguments;
            if (0 === i.length) return r._volume;
            if (
              (1 === i.length || (2 === i.length && void 0 === i[1])
                ? r._getSoundIds().indexOf(i[0]) >= 0
                  ? (t = parseInt(i[0], 10))
                  : (e = parseFloat(i[0]))
                : i.length >= 2 &&
                  ((e = parseFloat(i[0])), (t = parseInt(i[1], 10))),
              void 0 === e || !(e >= 0) || !(e <= 1))
            )
              return (n = t ? r._soundById(t) : r._sounds[0]) ? n._volume : 0;
            if ("loaded" !== r._state || r._playLock)
              return (
                r._queue.push({
                  event: "volume",
                  action: function () {
                    r.volume.apply(r, i);
                  },
                }),
                r
              );
            void 0 === t && (r._volume = e), (t = r._getSoundIds(t));
            for (var s = 0; s < t.length; s++)
              (n = r._soundById(t[s])) &&
                ((n._volume = e),
                i[2] || r._stopFade(t[s]),
                r._webAudio && n._node && !n._muted
                  ? n._node.gain.setValueAtTime(e, o.ctx.currentTime)
                  : n._node && !n._muted && (n._node.volume = e * o.volume()),
                r._emit("volume", n._id));
            return r;
          },
          fade: function (e, t, n, r) {
            var i = this;
            if ("loaded" !== i._state || i._playLock)
              return (
                i._queue.push({
                  event: "fade",
                  action: function () {
                    i.fade(e, t, n, r);
                  },
                }),
                i
              );
            (e = Math.min(Math.max(0, parseFloat(e)), 1)),
              (t = Math.min(Math.max(0, parseFloat(t)), 1)),
              (n = parseFloat(n)),
              i.volume(e, r);
            for (var s = i._getSoundIds(r), a = 0; a < s.length; a++) {
              var l = i._soundById(s[a]);
              if (l) {
                if ((r || i._stopFade(s[a]), i._webAudio && !l._muted)) {
                  var u = o.ctx.currentTime,
                    d = u + n / 1e3;
                  (l._volume = e),
                    l._node.gain.setValueAtTime(e, u),
                    l._node.gain.linearRampToValueAtTime(t, d);
                }
                i._startFadeInterval(l, e, t, n, s[a], void 0 === r);
              }
            }
            return i;
          },
          _startFadeInterval: function (e, t, n, r, i, o) {
            var s = this,
              a = t,
              l = n - t,
              u = Math.abs(l / 0.01),
              d = Date.now();
            (e._fadeTo = n),
              (e._interval = setInterval(function () {
                var i = (Date.now() - d) / r;
                (d = Date.now()),
                  (a += l * i),
                  (a = Math.round(100 * a) / 100),
                  (a = l < 0 ? Math.max(n, a) : Math.min(n, a)),
                  s._webAudio ? (e._volume = a) : s.volume(a, e._id, !0),
                  o && (s._volume = a),
                  ((n < t && a <= n) || (n > t && a >= n)) &&
                    (clearInterval(e._interval),
                    (e._interval = null),
                    (e._fadeTo = null),
                    s.volume(n, e._id),
                    s._emit("fade", e._id));
              }, Math.max(4, u > 0 ? r / u : r)));
          },
          _stopFade: function (e) {
            var t = this._soundById(e);
            return (
              t &&
                t._interval &&
                (this._webAudio &&
                  t._node.gain.cancelScheduledValues(o.ctx.currentTime),
                clearInterval(t._interval),
                (t._interval = null),
                this.volume(t._fadeTo, e),
                (t._fadeTo = null),
                this._emit("fade", e)),
              this
            );
          },
          loop: function () {
            var e,
              t,
              n,
              r = arguments;
            if (0 === r.length) return this._loop;
            if (1 === r.length) {
              if ("boolean" != typeof r[0])
                return !!(n = this._soundById(parseInt(r[0], 10))) && n._loop;
              (e = r[0]), (this._loop = e);
            } else 2 === r.length && ((e = r[0]), (t = parseInt(r[1], 10)));
            for (var i = this._getSoundIds(t), o = 0; o < i.length; o++)
              (n = this._soundById(i[o])) &&
                ((n._loop = e),
                this._webAudio &&
                  n._node &&
                  n._node.bufferSource &&
                  ((n._node.bufferSource.loop = e),
                  e &&
                    ((n._node.bufferSource.loopStart = n._start || 0),
                    (n._node.bufferSource.loopEnd = n._stop),
                    this.playing(i[o]) &&
                      (this.pause(i[o], !0), this.play(i[o], !0)))));
            return this;
          },
          rate: function () {
            var e,
              t,
              n,
              r = this,
              i = arguments;
            if (
              (0 === i.length
                ? (t = r._sounds[0]._id)
                : 1 === i.length
                ? r._getSoundIds().indexOf(i[0]) >= 0
                  ? (t = parseInt(i[0], 10))
                  : (e = parseFloat(i[0]))
                : 2 === i.length &&
                  ((e = parseFloat(i[0])), (t = parseInt(i[1], 10))),
              "number" != typeof e)
            )
              return (n = r._soundById(t)) ? n._rate : r._rate;
            if ("loaded" !== r._state || r._playLock)
              return (
                r._queue.push({
                  event: "rate",
                  action: function () {
                    r.rate.apply(r, i);
                  },
                }),
                r
              );
            void 0 === t && (r._rate = e), (t = r._getSoundIds(t));
            for (var s = 0; s < t.length; s++)
              if ((n = r._soundById(t[s]))) {
                r.playing(t[s]) &&
                  ((n._rateSeek = r.seek(t[s])),
                  (n._playStart = r._webAudio
                    ? o.ctx.currentTime
                    : n._playStart)),
                  (n._rate = e),
                  r._webAudio && n._node && n._node.bufferSource
                    ? n._node.bufferSource.playbackRate.setValueAtTime(
                        e,
                        o.ctx.currentTime
                      )
                    : n._node && (n._node.playbackRate = e);
                var a = r.seek(t[s]),
                  l =
                    (1e3 *
                      ((r._sprite[n._sprite][0] + r._sprite[n._sprite][1]) /
                        1e3 -
                        a)) /
                    Math.abs(n._rate);
                (r._endTimers[t[s]] || !n._paused) &&
                  (r._clearTimer(t[s]),
                  (r._endTimers[t[s]] = setTimeout(r._ended.bind(r, n), l))),
                  r._emit("rate", n._id);
              }
            return r;
          },
          seek: function () {
            var e,
              t,
              n = this,
              r = arguments;
            if (
              (0 === r.length
                ? n._sounds.length && (t = n._sounds[0]._id)
                : 1 === r.length
                ? n._getSoundIds().indexOf(r[0]) >= 0
                  ? (t = parseInt(r[0], 10))
                  : n._sounds.length &&
                    ((t = n._sounds[0]._id), (e = parseFloat(r[0])))
                : 2 === r.length &&
                  ((e = parseFloat(r[0])), (t = parseInt(r[1], 10))),
              void 0 === t)
            )
              return 0;
            if ("number" == typeof e && ("loaded" !== n._state || n._playLock))
              return (
                n._queue.push({
                  event: "seek",
                  action: function () {
                    n.seek.apply(n, r);
                  },
                }),
                n
              );
            var i = n._soundById(t);
            if (i) {
              if ("number" == typeof e && e >= 0) {
                var s = n.playing(t);
                s && n.pause(t, !0),
                  (i._seek = e),
                  (i._ended = !1),
                  n._clearTimer(t),
                  n._webAudio ||
                    !i._node ||
                    isNaN(i._node.duration) ||
                    (i._node.currentTime = e);
                var a = function () {
                  s && n.play(t, !0), n._emit("seek", t);
                };
                if (s && !n._webAudio) {
                  var l = function () {
                    n._playLock ? setTimeout(l, 0) : a();
                  };
                  setTimeout(l, 0);
                } else a();
              } else {
                if (!n._webAudio) return i._node.currentTime;
                var u = n.playing(t) ? o.ctx.currentTime - i._playStart : 0,
                  d = i._rateSeek ? i._rateSeek - i._seek : 0;
                return i._seek + (d + u * Math.abs(i._rate));
              }
            }
            return n;
          },
          playing: function (e) {
            if ("number" == typeof e) {
              var t = this._soundById(e);
              return !!t && !t._paused;
            }
            for (var n = 0; n < this._sounds.length; n++)
              if (!this._sounds[n]._paused) return !0;
            return !1;
          },
          duration: function (e) {
            var t = this._duration,
              n = this._soundById(e);
            return n && (t = this._sprite[n._sprite][1] / 1e3), t;
          },
          state: function () {
            return this._state;
          },
          unload: function () {
            for (var e = this, t = e._sounds, n = 0; n < t.length; n++)
              t[n]._paused || e.stop(t[n]._id),
                e._webAudio ||
                  (e._clearSound(t[n]._node),
                  t[n]._node.removeEventListener("error", t[n]._errorFn, !1),
                  t[n]._node.removeEventListener(
                    o._canPlayEvent,
                    t[n]._loadFn,
                    !1
                  ),
                  t[n]._node.removeEventListener("ended", t[n]._endFn, !1),
                  o._releaseHtml5Audio(t[n]._node)),
                delete t[n]._node,
                e._clearTimer(t[n]._id);
            var r = o._howls.indexOf(e);
            r >= 0 && o._howls.splice(r, 1);
            var i = !0;
            for (n = 0; n < o._howls.length; n++)
              if (
                o._howls[n]._src === e._src ||
                e._src.indexOf(o._howls[n]._src) >= 0
              ) {
                i = !1;
                break;
              }
            return (
              l && i && delete l[e._src],
              (o.noAudio = !1),
              (e._state = "unloaded"),
              (e._sounds = []),
              (e = null),
              null
            );
          },
          on: function (e, t, n, r) {
            var i = this["_on" + e];
            return (
              "function" == typeof t &&
                i.push(r ? { id: n, fn: t, once: r } : { id: n, fn: t }),
              this
            );
          },
          off: function (e, t, n) {
            var r = this["_on" + e],
              i = 0;
            if (("number" == typeof t && ((n = t), (t = null)), t || n))
              for (i = 0; i < r.length; i++) {
                var o = n === r[i].id;
                if ((t === r[i].fn && o) || (!t && o)) {
                  r.splice(i, 1);
                  break;
                }
              }
            else if (e) this["_on" + e] = [];
            else {
              var s = Object.keys(this);
              for (i = 0; i < s.length; i++)
                0 === s[i].indexOf("_on") &&
                  Array.isArray(this[s[i]]) &&
                  (this[s[i]] = []);
            }
            return this;
          },
          once: function (e, t, n) {
            return this.on(e, t, n, 1), this;
          },
          _emit: function (e, t, n) {
            for (var r = this["_on" + e], i = r.length - 1; i >= 0; i--)
              (!r[i].id || r[i].id === t || "load" === e) &&
                (setTimeout(
                  function (e) {
                    e.call(this, t, n);
                  }.bind(this, r[i].fn),
                  0
                ),
                r[i].once && this.off(e, r[i].fn, r[i].id));
            return this._loadQueue(e), this;
          },
          _loadQueue: function (e) {
            if (this._queue.length > 0) {
              var t = this._queue[0];
              t.event === e && (this._queue.shift(), this._loadQueue()),
                e || t.action();
            }
            return this;
          },
          _ended: function (e) {
            var t = e._sprite;
            if (
              !this._webAudio &&
              e._node &&
              !e._node.paused &&
              !e._node.ended &&
              e._node.currentTime < e._stop
            )
              return setTimeout(this._ended.bind(this, e), 100), this;
            var n = !!(e._loop || this._sprite[t][2]);
            if (
              (this._emit("end", e._id),
              !this._webAudio && n && this.stop(e._id, !0).play(e._id),
              this._webAudio && n)
            ) {
              this._emit("play", e._id),
                (e._seek = e._start || 0),
                (e._rateSeek = 0),
                (e._playStart = o.ctx.currentTime);
              var r = ((e._stop - e._start) * 1e3) / Math.abs(e._rate);
              this._endTimers[e._id] = setTimeout(this._ended.bind(this, e), r);
            }
            return (
              this._webAudio &&
                !n &&
                ((e._paused = !0),
                (e._ended = !0),
                (e._seek = e._start || 0),
                (e._rateSeek = 0),
                this._clearTimer(e._id),
                this._cleanBuffer(e._node),
                o._autoSuspend()),
              this._webAudio || n || this.stop(e._id, !0),
              this
            );
          },
          _clearTimer: function (e) {
            if (this._endTimers[e]) {
              if ("function" != typeof this._endTimers[e])
                clearTimeout(this._endTimers[e]);
              else {
                var t = this._soundById(e);
                t &&
                  t._node &&
                  t._node.removeEventListener("ended", this._endTimers[e], !1);
              }
              delete this._endTimers[e];
            }
            return this;
          },
          _soundById: function (e) {
            for (var t = 0; t < this._sounds.length; t++)
              if (e === this._sounds[t]._id) return this._sounds[t];
            return null;
          },
          _inactiveSound: function () {
            this._drain();
            for (var e = 0; e < this._sounds.length; e++)
              if (this._sounds[e]._ended) return this._sounds[e].reset();
            return new a(this);
          },
          _drain: function () {
            var e = this._pool,
              t = 0,
              n = 0;
            if (!(this._sounds.length < e)) {
              for (n = 0; n < this._sounds.length; n++)
                this._sounds[n]._ended && t++;
              for (n = this._sounds.length - 1; n >= 0; n--) {
                if (t <= e) return;
                this._sounds[n]._ended &&
                  (this._webAudio &&
                    this._sounds[n]._node &&
                    this._sounds[n]._node.disconnect(0),
                  this._sounds.splice(n, 1),
                  t--);
              }
            }
          },
          _getSoundIds: function (e) {
            if (void 0 !== e) return [e];
            for (var t = [], n = 0; n < this._sounds.length; n++)
              t.push(this._sounds[n]._id);
            return t;
          },
          _refreshBuffer: function (e) {
            return (
              (e._node.bufferSource = o.ctx.createBufferSource()),
              (e._node.bufferSource.buffer = l[this._src]),
              e._panner
                ? e._node.bufferSource.connect(e._panner)
                : e._node.bufferSource.connect(e._node),
              (e._node.bufferSource.loop = e._loop),
              e._loop &&
                ((e._node.bufferSource.loopStart = e._start || 0),
                (e._node.bufferSource.loopEnd = e._stop || 0)),
              e._node.bufferSource.playbackRate.setValueAtTime(
                e._rate,
                o.ctx.currentTime
              ),
              this
            );
          },
          _cleanBuffer: function (e) {
            var t = o._navigator && o._navigator.vendor.indexOf("Apple") >= 0;
            if (!e.bufferSource) return this;
            if (
              o._scratchBuffer &&
              e.bufferSource &&
              ((e.bufferSource.onended = null), e.bufferSource.disconnect(0), t)
            )
              try {
                e.bufferSource.buffer = o._scratchBuffer;
              } catch (e) {}
            return (e.bufferSource = null), this;
          },
          _clearSound: function (e) {
            /MSIE |Trident\//.test(o._navigator && o._navigator.userAgent) ||
              (e.src =
                "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
          },
        }),
        ((a = function (e) {
          (this._parent = e), this.init();
        }).prototype = {
          init: function () {
            var e = this._parent;
            return (
              (this._muted = e._muted),
              (this._loop = e._loop),
              (this._volume = e._volume),
              (this._rate = e._rate),
              (this._seek = 0),
              (this._paused = !0),
              (this._ended = !0),
              (this._sprite = "__default"),
              (this._id = ++o._counter),
              e._sounds.push(this),
              this.create(),
              this
            );
          },
          create: function () {
            var e = this._parent,
              t =
                o._muted || this._muted || this._parent._muted
                  ? 0
                  : this._volume;
            return (
              e._webAudio
                ? ((this._node =
                    void 0 === o.ctx.createGain
                      ? o.ctx.createGainNode()
                      : o.ctx.createGain()),
                  this._node.gain.setValueAtTime(t, o.ctx.currentTime),
                  (this._node.paused = !0),
                  this._node.connect(o.masterGain))
                : o.noAudio ||
                  ((this._node = o._obtainHtml5Audio()),
                  (this._errorFn = this._errorListener.bind(this)),
                  this._node.addEventListener("error", this._errorFn, !1),
                  (this._loadFn = this._loadListener.bind(this)),
                  this._node.addEventListener(
                    o._canPlayEvent,
                    this._loadFn,
                    !1
                  ),
                  (this._endFn = this._endListener.bind(this)),
                  this._node.addEventListener("ended", this._endFn, !1),
                  (this._node.src = e._src),
                  (this._node.preload =
                    !0 === e._preload ? "auto" : e._preload),
                  (this._node.volume = t * o.volume()),
                  this._node.load()),
              this
            );
          },
          reset: function () {
            var e = this._parent;
            return (
              (this._muted = e._muted),
              (this._loop = e._loop),
              (this._volume = e._volume),
              (this._rate = e._rate),
              (this._seek = 0),
              (this._rateSeek = 0),
              (this._paused = !0),
              (this._ended = !0),
              (this._sprite = "__default"),
              (this._id = ++o._counter),
              this
            );
          },
          _errorListener: function () {
            this._parent._emit(
              "loaderror",
              this._id,
              this._node.error ? this._node.error.code : 0
            ),
              this._node.removeEventListener("error", this._errorFn, !1);
          },
          _loadListener: function () {
            var e = this._parent;
            (e._duration = Math.ceil(10 * this._node.duration) / 10),
              0 === Object.keys(e._sprite).length &&
                (e._sprite = { __default: [0, 1e3 * e._duration] }),
              "loaded" !== e._state &&
                ((e._state = "loaded"), e._emit("load"), e._loadQueue()),
              this._node.removeEventListener(o._canPlayEvent, this._loadFn, !1);
          },
          _endListener: function () {
            var e = this._parent;
            e._duration === 1 / 0 &&
              ((e._duration = Math.ceil(10 * this._node.duration) / 10),
              e._sprite.__default[1] === 1 / 0 &&
                (e._sprite.__default[1] = 1e3 * e._duration),
              e._ended(this)),
              this._node.removeEventListener("ended", this._endFn, !1);
          },
        }),
        (l = {}),
        (u = function (e) {
          var t = e._src;
          if (l[t]) {
            (e._duration = l[t].duration), h(e);
            return;
          }
          if (/^data:[^;]+;base64,/.test(t)) {
            for (
              var n = atob(t.split(",")[1]),
                r = new Uint8Array(n.length),
                i = 0;
              i < n.length;
              ++i
            )
              r[i] = n.charCodeAt(i);
            c(r.buffer, e);
          } else {
            var o = new XMLHttpRequest();
            o.open(e._xhr.method, t, !0),
              (o.withCredentials = e._xhr.withCredentials),
              (o.responseType = "arraybuffer"),
              e._xhr.headers &&
                Object.keys(e._xhr.headers).forEach(function (t) {
                  o.setRequestHeader(t, e._xhr.headers[t]);
                }),
              (o.onload = function () {
                var t = (o.status + "")[0];
                if ("0" !== t && "2" !== t && "3" !== t) {
                  e._emit(
                    "loaderror",
                    null,
                    "Failed loading audio file with status: " + o.status + "."
                  );
                  return;
                }
                c(o.response, e);
              }),
              (o.onerror = function () {
                e._webAudio &&
                  ((e._html5 = !0),
                  (e._webAudio = !1),
                  (e._sounds = []),
                  delete l[t],
                  e.load());
              }),
              d(o);
          }
        }),
        (d = function (e) {
          try {
            e.send();
          } catch (t) {
            e.onerror();
          }
        }),
        (c = function (e, t) {
          var n = function () {
              t._emit("loaderror", null, "Decoding audio data failed.");
            },
            r = function (e) {
              e && t._sounds.length > 0 ? ((l[t._src] = e), h(t, e)) : n();
            };
          "undefined" != typeof Promise && 1 === o.ctx.decodeAudioData.length
            ? o.ctx.decodeAudioData(e).then(r).catch(n)
            : o.ctx.decodeAudioData(e, r, n);
        }),
        (h = function (e, t) {
          t && !e._duration && (e._duration = t.duration),
            0 === Object.keys(e._sprite).length &&
              (e._sprite = { __default: [0, 1e3 * e._duration] }),
            "loaded" !== e._state &&
              ((e._state = "loaded"), e._emit("load"), e._loadQueue());
        }),
        (p = function () {
          if (o.usingWebAudio) {
            try {
              "undefined" != typeof AudioContext
                ? (o.ctx = new AudioContext())
                : "undefined" != typeof webkitAudioContext
                ? (o.ctx = new webkitAudioContext())
                : (o.usingWebAudio = !1);
            } catch (e) {
              o.usingWebAudio = !1;
            }
            o.ctx || (o.usingWebAudio = !1);
            var e = /iP(hone|od|ad)/.test(
                o._navigator && o._navigator.platform
              ),
              t =
                o._navigator &&
                o._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
              n = t ? parseInt(t[1], 10) : null;
            if (e && n && n < 9) {
              var r = /safari/.test(
                o._navigator && o._navigator.userAgent.toLowerCase()
              );
              o._navigator && !r && (o.usingWebAudio = !1);
            }
            o.usingWebAudio &&
              ((o.masterGain =
                void 0 === o.ctx.createGain
                  ? o.ctx.createGainNode()
                  : o.ctx.createGain()),
              o.masterGain.gain.setValueAtTime(
                o._muted ? 0 : o._volume,
                o.ctx.currentTime
              ),
              o.masterGain.connect(o.ctx.destination)),
              o._setup();
          }
        }),
        void 0 !==
          (r = function () {
            return { Howler: o, Howl: s };
          }.apply(t, [])) && (e.exports = r),
        (t.Howler = o),
        (t.Howl = s),
        void 0 !== n.g
          ? ((n.g.HowlerGlobal = i),
            (n.g.Howler = o),
            (n.g.Howl = s),
            (n.g.Sound = a))
          : "undefined" != typeof window &&
            ((window.HowlerGlobal = i),
            (window.Howler = o),
            (window.Howl = s),
            (window.Sound = a)),
        (HowlerGlobal.prototype._pos = [0, 0, 0]),
        (HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0]),
        (HowlerGlobal.prototype.stereo = function (e) {
          if (!this.ctx || !this.ctx.listener) return this;
          for (var t = this._howls.length - 1; t >= 0; t--)
            this._howls[t].stereo(e);
          return this;
        }),
        (HowlerGlobal.prototype.pos = function (e, t, n) {
          return this.ctx && this.ctx.listener
            ? ((t = "number" != typeof t ? this._pos[1] : t),
              (n = "number" != typeof n ? this._pos[2] : n),
              "number" != typeof e)
              ? this._pos
              : ((this._pos = [e, t, n]),
                void 0 !== this.ctx.listener.positionX
                  ? (this.ctx.listener.positionX.setTargetAtTime(
                      this._pos[0],
                      Howler.ctx.currentTime,
                      0.1
                    ),
                    this.ctx.listener.positionY.setTargetAtTime(
                      this._pos[1],
                      Howler.ctx.currentTime,
                      0.1
                    ),
                    this.ctx.listener.positionZ.setTargetAtTime(
                      this._pos[2],
                      Howler.ctx.currentTime,
                      0.1
                    ))
                  : this.ctx.listener.setPosition(
                      this._pos[0],
                      this._pos[1],
                      this._pos[2]
                    ),
                this)
            : this;
        }),
        (HowlerGlobal.prototype.orientation = function (e, t, n, r, i, o) {
          if (!this.ctx || !this.ctx.listener) return this;
          var s = this._orientation;
          return ((t = "number" != typeof t ? s[1] : t),
          (n = "number" != typeof n ? s[2] : n),
          (r = "number" != typeof r ? s[3] : r),
          (i = "number" != typeof i ? s[4] : i),
          (o = "number" != typeof o ? s[5] : o),
          "number" != typeof e)
            ? s
            : ((this._orientation = [e, t, n, r, i, o]),
              void 0 !== this.ctx.listener.forwardX
                ? (this.ctx.listener.forwardX.setTargetAtTime(
                    e,
                    Howler.ctx.currentTime,
                    0.1
                  ),
                  this.ctx.listener.forwardY.setTargetAtTime(
                    t,
                    Howler.ctx.currentTime,
                    0.1
                  ),
                  this.ctx.listener.forwardZ.setTargetAtTime(
                    n,
                    Howler.ctx.currentTime,
                    0.1
                  ),
                  this.ctx.listener.upX.setTargetAtTime(
                    r,
                    Howler.ctx.currentTime,
                    0.1
                  ),
                  this.ctx.listener.upY.setTargetAtTime(
                    i,
                    Howler.ctx.currentTime,
                    0.1
                  ),
                  this.ctx.listener.upZ.setTargetAtTime(
                    o,
                    Howler.ctx.currentTime,
                    0.1
                  ))
                : this.ctx.listener.setOrientation(e, t, n, r, i, o),
              this);
        }),
        (Howl.prototype.init =
          ((f = Howl.prototype.init),
          function (e) {
            return (
              (this._orientation = e.orientation || [1, 0, 0]),
              (this._stereo = e.stereo || null),
              (this._pos = e.pos || null),
              (this._pannerAttr = {
                coneInnerAngle:
                  void 0 !== e.coneInnerAngle ? e.coneInnerAngle : 360,
                coneOuterAngle:
                  void 0 !== e.coneOuterAngle ? e.coneOuterAngle : 360,
                coneOuterGain: void 0 !== e.coneOuterGain ? e.coneOuterGain : 0,
                distanceModel:
                  void 0 !== e.distanceModel ? e.distanceModel : "inverse",
                maxDistance: void 0 !== e.maxDistance ? e.maxDistance : 1e4,
                panningModel:
                  void 0 !== e.panningModel ? e.panningModel : "HRTF",
                refDistance: void 0 !== e.refDistance ? e.refDistance : 1,
                rolloffFactor: void 0 !== e.rolloffFactor ? e.rolloffFactor : 1,
              }),
              (this._onstereo = e.onstereo ? [{ fn: e.onstereo }] : []),
              (this._onpos = e.onpos ? [{ fn: e.onpos }] : []),
              (this._onorientation = e.onorientation
                ? [{ fn: e.onorientation }]
                : []),
              f.call(this, e)
            );
          })),
        (Howl.prototype.stereo = function (e, t) {
          var n = this;
          if (!n._webAudio) return n;
          if ("loaded" !== n._state)
            return (
              n._queue.push({
                event: "stereo",
                action: function () {
                  n.stereo(e, t);
                },
              }),
              n
            );
          var r =
            void 0 === Howler.ctx.createStereoPanner ? "spatial" : "stereo";
          if (void 0 === t) {
            if ("number" != typeof e) return n._stereo;
            (n._stereo = e), (n._pos = [e, 0, 0]);
          }
          for (var i = n._getSoundIds(t), o = 0; o < i.length; o++) {
            var s = n._soundById(i[o]);
            if (s) {
              if ("number" != typeof e) return s._stereo;
              (s._stereo = e),
                (s._pos = [e, 0, 0]),
                s._node &&
                  ((s._pannerAttr.panningModel = "equalpower"),
                  (s._panner && s._panner.pan) || v(s, r),
                  "spatial" === r
                    ? void 0 !== s._panner.positionX
                      ? (s._panner.positionX.setValueAtTime(
                          e,
                          Howler.ctx.currentTime
                        ),
                        s._panner.positionY.setValueAtTime(
                          0,
                          Howler.ctx.currentTime
                        ),
                        s._panner.positionZ.setValueAtTime(
                          0,
                          Howler.ctx.currentTime
                        ))
                      : s._panner.setPosition(e, 0, 0)
                    : s._panner.pan.setValueAtTime(e, Howler.ctx.currentTime)),
                n._emit("stereo", s._id);
            }
          }
          return n;
        }),
        (Howl.prototype.pos = function (e, t, n, r) {
          var i = this;
          if (!i._webAudio) return i;
          if ("loaded" !== i._state)
            return (
              i._queue.push({
                event: "pos",
                action: function () {
                  i.pos(e, t, n, r);
                },
              }),
              i
            );
          if (
            ((t = "number" != typeof t ? 0 : t),
            (n = "number" != typeof n ? -0.5 : n),
            void 0 === r)
          ) {
            if ("number" != typeof e) return i._pos;
            i._pos = [e, t, n];
          }
          for (var o = i._getSoundIds(r), s = 0; s < o.length; s++) {
            var a = i._soundById(o[s]);
            if (a) {
              if ("number" != typeof e) return a._pos;
              (a._pos = [e, t, n]),
                a._node &&
                  ((!a._panner || a._panner.pan) && v(a, "spatial"),
                  void 0 !== a._panner.positionX
                    ? (a._panner.positionX.setValueAtTime(
                        e,
                        Howler.ctx.currentTime
                      ),
                      a._panner.positionY.setValueAtTime(
                        t,
                        Howler.ctx.currentTime
                      ),
                      a._panner.positionZ.setValueAtTime(
                        n,
                        Howler.ctx.currentTime
                      ))
                    : a._panner.setPosition(e, t, n)),
                i._emit("pos", a._id);
            }
          }
          return i;
        }),
        (Howl.prototype.orientation = function (e, t, n, r) {
          var i = this;
          if (!i._webAudio) return i;
          if ("loaded" !== i._state)
            return (
              i._queue.push({
                event: "orientation",
                action: function () {
                  i.orientation(e, t, n, r);
                },
              }),
              i
            );
          if (
            ((t = "number" != typeof t ? i._orientation[1] : t),
            (n = "number" != typeof n ? i._orientation[2] : n),
            void 0 === r)
          ) {
            if ("number" != typeof e) return i._orientation;
            i._orientation = [e, t, n];
          }
          for (var o = i._getSoundIds(r), s = 0; s < o.length; s++) {
            var a = i._soundById(o[s]);
            if (a) {
              if ("number" != typeof e) return a._orientation;
              (a._orientation = [e, t, n]),
                a._node &&
                  (a._panner ||
                    (a._pos || (a._pos = i._pos || [0, 0, -0.5]),
                    v(a, "spatial")),
                  void 0 !== a._panner.orientationX
                    ? (a._panner.orientationX.setValueAtTime(
                        e,
                        Howler.ctx.currentTime
                      ),
                      a._panner.orientationY.setValueAtTime(
                        t,
                        Howler.ctx.currentTime
                      ),
                      a._panner.orientationZ.setValueAtTime(
                        n,
                        Howler.ctx.currentTime
                      ))
                    : a._panner.setOrientation(e, t, n)),
                i._emit("orientation", a._id);
            }
          }
          return i;
        }),
        (Howl.prototype.pannerAttr = function () {
          var e,
            t,
            n,
            r = arguments;
          if (!this._webAudio) return this;
          if (0 === r.length) return this._pannerAttr;
          if (1 === r.length) {
            if ("object" != typeof r[0])
              return (n = this._soundById(parseInt(r[0], 10)))
                ? n._pannerAttr
                : this._pannerAttr;
            (e = r[0]),
              void 0 === t &&
                (e.pannerAttr ||
                  (e.pannerAttr = {
                    coneInnerAngle: e.coneInnerAngle,
                    coneOuterAngle: e.coneOuterAngle,
                    coneOuterGain: e.coneOuterGain,
                    distanceModel: e.distanceModel,
                    maxDistance: e.maxDistance,
                    refDistance: e.refDistance,
                    rolloffFactor: e.rolloffFactor,
                    panningModel: e.panningModel,
                  }),
                (this._pannerAttr = {
                  coneInnerAngle:
                    void 0 !== e.pannerAttr.coneInnerAngle
                      ? e.pannerAttr.coneInnerAngle
                      : this._coneInnerAngle,
                  coneOuterAngle:
                    void 0 !== e.pannerAttr.coneOuterAngle
                      ? e.pannerAttr.coneOuterAngle
                      : this._coneOuterAngle,
                  coneOuterGain:
                    void 0 !== e.pannerAttr.coneOuterGain
                      ? e.pannerAttr.coneOuterGain
                      : this._coneOuterGain,
                  distanceModel:
                    void 0 !== e.pannerAttr.distanceModel
                      ? e.pannerAttr.distanceModel
                      : this._distanceModel,
                  maxDistance:
                    void 0 !== e.pannerAttr.maxDistance
                      ? e.pannerAttr.maxDistance
                      : this._maxDistance,
                  refDistance:
                    void 0 !== e.pannerAttr.refDistance
                      ? e.pannerAttr.refDistance
                      : this._refDistance,
                  rolloffFactor:
                    void 0 !== e.pannerAttr.rolloffFactor
                      ? e.pannerAttr.rolloffFactor
                      : this._rolloffFactor,
                  panningModel:
                    void 0 !== e.pannerAttr.panningModel
                      ? e.pannerAttr.panningModel
                      : this._panningModel,
                }));
          } else 2 === r.length && ((e = r[0]), (t = parseInt(r[1], 10)));
          for (var i = this._getSoundIds(t), o = 0; o < i.length; o++)
            if ((n = this._soundById(i[o]))) {
              var s = n._pannerAttr;
              s = {
                coneInnerAngle:
                  void 0 !== e.coneInnerAngle
                    ? e.coneInnerAngle
                    : s.coneInnerAngle,
                coneOuterAngle:
                  void 0 !== e.coneOuterAngle
                    ? e.coneOuterAngle
                    : s.coneOuterAngle,
                coneOuterGain:
                  void 0 !== e.coneOuterGain
                    ? e.coneOuterGain
                    : s.coneOuterGain,
                distanceModel:
                  void 0 !== e.distanceModel
                    ? e.distanceModel
                    : s.distanceModel,
                maxDistance:
                  void 0 !== e.maxDistance ? e.maxDistance : s.maxDistance,
                refDistance:
                  void 0 !== e.refDistance ? e.refDistance : s.refDistance,
                rolloffFactor:
                  void 0 !== e.rolloffFactor
                    ? e.rolloffFactor
                    : s.rolloffFactor,
                panningModel:
                  void 0 !== e.panningModel ? e.panningModel : s.panningModel,
              };
              var a = n._panner;
              a ||
                (n._pos || (n._pos = this._pos || [0, 0, -0.5]),
                v(n, "spatial"),
                (a = n._panner)),
                (a.coneInnerAngle = s.coneInnerAngle),
                (a.coneOuterAngle = s.coneOuterAngle),
                (a.coneOuterGain = s.coneOuterGain),
                (a.distanceModel = s.distanceModel),
                (a.maxDistance = s.maxDistance),
                (a.refDistance = s.refDistance),
                (a.rolloffFactor = s.rolloffFactor),
                (a.panningModel = s.panningModel);
            }
          return this;
        }),
        (Sound.prototype.init =
          ((m = Sound.prototype.init),
          function () {
            var e = this._parent;
            (this._orientation = e._orientation),
              (this._stereo = e._stereo),
              (this._pos = e._pos),
              (this._pannerAttr = e._pannerAttr),
              m.call(this),
              this._stereo
                ? e.stereo(this._stereo)
                : this._pos &&
                  e.pos(this._pos[0], this._pos[1], this._pos[2], this._id);
          })),
        (Sound.prototype.reset =
          ((g = Sound.prototype.reset),
          function () {
            var e = this._parent;
            return (
              (this._orientation = e._orientation),
              (this._stereo = e._stereo),
              (this._pos = e._pos),
              (this._pannerAttr = e._pannerAttr),
              this._stereo
                ? e.stereo(this._stereo)
                : this._pos
                ? e.pos(this._pos[0], this._pos[1], this._pos[2], this._id)
                : this._panner &&
                  (this._panner.disconnect(0),
                  (this._panner = void 0),
                  e._refreshBuffer(this)),
              g.call(this)
            );
          })),
        (v = function (e, t) {
          "spatial" === (t = t || "spatial")
            ? ((e._panner = Howler.ctx.createPanner()),
              (e._panner.coneInnerAngle = e._pannerAttr.coneInnerAngle),
              (e._panner.coneOuterAngle = e._pannerAttr.coneOuterAngle),
              (e._panner.coneOuterGain = e._pannerAttr.coneOuterGain),
              (e._panner.distanceModel = e._pannerAttr.distanceModel),
              (e._panner.maxDistance = e._pannerAttr.maxDistance),
              (e._panner.refDistance = e._pannerAttr.refDistance),
              (e._panner.rolloffFactor = e._pannerAttr.rolloffFactor),
              (e._panner.panningModel = e._pannerAttr.panningModel),
              void 0 !== e._panner.positionX
                ? (e._panner.positionX.setValueAtTime(
                    e._pos[0],
                    Howler.ctx.currentTime
                  ),
                  e._panner.positionY.setValueAtTime(
                    e._pos[1],
                    Howler.ctx.currentTime
                  ),
                  e._panner.positionZ.setValueAtTime(
                    e._pos[2],
                    Howler.ctx.currentTime
                  ))
                : e._panner.setPosition(e._pos[0], e._pos[1], e._pos[2]),
              void 0 !== e._panner.orientationX
                ? (e._panner.orientationX.setValueAtTime(
                    e._orientation[0],
                    Howler.ctx.currentTime
                  ),
                  e._panner.orientationY.setValueAtTime(
                    e._orientation[1],
                    Howler.ctx.currentTime
                  ),
                  e._panner.orientationZ.setValueAtTime(
                    e._orientation[2],
                    Howler.ctx.currentTime
                  ))
                : e._panner.setOrientation(
                    e._orientation[0],
                    e._orientation[1],
                    e._orientation[2]
                  ))
            : ((e._panner = Howler.ctx.createStereoPanner()),
              e._panner.pan.setValueAtTime(e._stereo, Howler.ctx.currentTime)),
            e._panner.connect(e._node),
            e._paused || e._parent.pause(e._id, !0).play(e._id, !0);
        });
    },
    9763: function (e, t, n) {
      "use strict";
      n.d(t, {
        Z: function () {
          return s;
        },
      });
      var r = n(2265),
        i = {
          xmlns: "http://www.w3.org/2000/svg",
          width: 24,
          height: 24,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        };
      let o = (e) =>
          e
            .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
            .toLowerCase()
            .trim(),
        s = (e, t) => {
          let n = (0, r.forwardRef)((n, s) => {
            let {
              color: a = "currentColor",
              size: l = 24,
              strokeWidth: u = 2,
              absoluteStrokeWidth: d,
              className: c = "",
              children: h,
              ...p
            } = n;
            return (0, r.createElement)(
              "svg",
              {
                ref: s,
                ...i,
                width: l,
                height: l,
                stroke: a,
                strokeWidth: d ? (24 * Number(u)) / Number(l) : u,
                className: ["lucide", "lucide-".concat(o(e)), c].join(" "),
                ...p,
              },
              [
                ...t.map((e) => {
                  let [t, n] = e;
                  return (0, r.createElement)(t, n);
                }),
                ...(Array.isArray(h) ? h : [h]),
              ]
            );
          });
          return (n.displayName = "".concat(e)), n;
        };
    },
    9227: function (e, t, n) {
      "use strict";
      n.d(t, {
        Z: function () {
          return r;
        },
      });
      let r = (0, n(9763).Z)("Pause", [
        ["rect", { width: "4", height: "16", x: "6", y: "4", key: "iffhe4" }],
        ["rect", { width: "4", height: "16", x: "14", y: "4", key: "sjin7j" }],
      ]);
    },
    3276: function (e, t, n) {
      "use strict";
      n.d(t, {
        Z: function () {
          return r;
        },
      });
      let r = (0, n(9763).Z)("Play", [
        ["polygon", { points: "5 3 19 12 5 21 5 3", key: "191637" }],
      ]);
    },
    3145: function (e, t, n) {
      "use strict";
      n.d(t, {
        default: function () {
          return i.a;
        },
      });
      var r = n(8461),
        i = n.n(r);
    },
    5878: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "Image", {
          enumerable: !0,
          get: function () {
            return _;
          },
        });
      let r = n(7043),
        i = n(3099),
        o = n(7437),
        s = i._(n(2265)),
        a = r._(n(4887)),
        l = r._(n(8293)),
        u = n(5346),
        d = n(128),
        c = n(2589);
      n(1765);
      let h = n(5523),
        p = r._(n(5084)),
        f = {
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          path: "/_next/image",
          loader: "default",
          dangerouslyAllowSVG: !1,
          unoptimized: !1,
        };
      function m(e, t, n, r, i, o, s) {
        let a = null == e ? void 0 : e.src;
        e &&
          e["data-loaded-src"] !== a &&
          ((e["data-loaded-src"] = a),
          ("decode" in e ? e.decode() : Promise.resolve())
            .catch(() => {})
            .then(() => {
              if (e.parentElement && e.isConnected) {
                if (("empty" !== t && i(!0), null == n ? void 0 : n.current)) {
                  let t = new Event("load");
                  Object.defineProperty(t, "target", {
                    writable: !1,
                    value: e,
                  });
                  let r = !1,
                    i = !1;
                  n.current({
                    ...t,
                    nativeEvent: t,
                    currentTarget: e,
                    target: e,
                    isDefaultPrevented: () => r,
                    isPropagationStopped: () => i,
                    persist: () => {},
                    preventDefault: () => {
                      (r = !0), t.preventDefault();
                    },
                    stopPropagation: () => {
                      (i = !0), t.stopPropagation();
                    },
                  });
                }
                (null == r ? void 0 : r.current) && r.current(e);
              }
            }));
      }
      function g(e) {
        return s.use ? { fetchPriority: e } : { fetchpriority: e };
      }
      "undefined" == typeof window && (globalThis.__NEXT_IMAGE_IMPORTED = !0);
      let v = (0, s.forwardRef)((e, t) => {
        let {
          src: n,
          srcSet: r,
          sizes: i,
          height: a,
          width: l,
          decoding: u,
          className: d,
          style: c,
          fetchPriority: h,
          placeholder: p,
          loading: f,
          unoptimized: v,
          fill: y,
          onLoadRef: _,
          onLoadingCompleteRef: b,
          setBlurComplete: x,
          setShowAltText: w,
          sizesInput: A,
          onLoad: P,
          onError: T,
          ...S
        } = e;
        return (0, o.jsx)("img", {
          ...S,
          ...g(h),
          loading: f,
          width: l,
          height: a,
          decoding: u,
          "data-nimg": y ? "fill" : "1",
          className: d,
          style: c,
          sizes: i,
          srcSet: r,
          src: n,
          ref: (0, s.useCallback)(
            (e) => {
              t &&
                ("function" == typeof t
                  ? t(e)
                  : "object" == typeof t && (t.current = e)),
                e &&
                  (T && (e.src = e.src), e.complete && m(e, p, _, b, x, v, A));
            },
            [n, p, _, b, x, T, v, A, t]
          ),
          onLoad: (e) => {
            m(e.currentTarget, p, _, b, x, v, A);
          },
          onError: (e) => {
            w(!0), "empty" !== p && x(!0), T && T(e);
          },
        });
      });
      function y(e) {
        let { isAppRouter: t, imgAttributes: n } = e,
          r = {
            as: "image",
            imageSrcSet: n.srcSet,
            imageSizes: n.sizes,
            crossOrigin: n.crossOrigin,
            referrerPolicy: n.referrerPolicy,
            ...g(n.fetchPriority),
          };
        return t && a.default.preload
          ? (a.default.preload(n.src, r), null)
          : (0, o.jsx)(l.default, {
              children: (0, o.jsx)(
                "link",
                { rel: "preload", href: n.srcSet ? void 0 : n.src, ...r },
                "__nimg-" + n.src + n.srcSet + n.sizes
              ),
            });
      }
      let _ = (0, s.forwardRef)((e, t) => {
        let n = (0, s.useContext)(h.RouterContext),
          r = (0, s.useContext)(c.ImageConfigContext),
          i = (0, s.useMemo)(() => {
            var e;
            let t = f || r || d.imageConfigDefault,
              n = [...t.deviceSizes, ...t.imageSizes].sort((e, t) => e - t),
              i = t.deviceSizes.sort((e, t) => e - t),
              o = null == (e = t.qualities) ? void 0 : e.sort((e, t) => e - t);
            return { ...t, allSizes: n, deviceSizes: i, qualities: o };
          }, [r]),
          { onLoad: a, onLoadingComplete: l } = e,
          m = (0, s.useRef)(a);
        (0, s.useEffect)(() => {
          m.current = a;
        }, [a]);
        let g = (0, s.useRef)(l);
        (0, s.useEffect)(() => {
          g.current = l;
        }, [l]);
        let [_, b] = (0, s.useState)(!1),
          [x, w] = (0, s.useState)(!1),
          { props: A, meta: P } = (0, u.getImgProps)(e, {
            defaultLoader: p.default,
            imgConf: i,
            blurComplete: _,
            showAltText: x,
          });
        return (0, o.jsxs)(o.Fragment, {
          children: [
            (0, o.jsx)(v, {
              ...A,
              unoptimized: P.unoptimized,
              placeholder: P.placeholder,
              fill: P.fill,
              onLoadRef: m,
              onLoadingCompleteRef: g,
              setBlurComplete: b,
              setShowAltText: w,
              sizesInput: e.sizes,
              ref: t,
            }),
            P.priority
              ? (0, o.jsx)(y, { isAppRouter: !n, imgAttributes: A })
              : null,
          ],
        });
      });
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    1436: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "AmpStateContext", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
      let r = n(7043)._(n(2265)).default.createContext({});
    },
    9019: function (e, t) {
      "use strict";
      function n(e) {
        let {
          ampFirst: t = !1,
          hybrid: n = !1,
          hasQuery: r = !1,
        } = void 0 === e ? {} : e;
        return t || (n && r);
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "isInAmpMode", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
    },
    5346: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "getImgProps", {
          enumerable: !0,
          get: function () {
            return a;
          },
        }),
        n(1765);
      let r = n(6496),
        i = n(128);
      function o(e) {
        return void 0 !== e.default;
      }
      function s(e) {
        return void 0 === e
          ? e
          : "number" == typeof e
          ? Number.isFinite(e)
            ? e
            : NaN
          : "string" == typeof e && /^[0-9]+$/.test(e)
          ? parseInt(e, 10)
          : NaN;
      }
      function a(e, t) {
        var n, a;
        let l,
          u,
          d,
          {
            src: c,
            sizes: h,
            unoptimized: p = !1,
            priority: f = !1,
            loading: m,
            className: g,
            quality: v,
            width: y,
            height: _,
            fill: b = !1,
            style: x,
            overrideSrc: w,
            onLoad: A,
            onLoadingComplete: P,
            placeholder: T = "empty",
            blurDataURL: S,
            fetchPriority: k,
            decoding: C = "async",
            layout: E,
            objectFit: M,
            objectPosition: O,
            lazyBoundary: V,
            lazyRoot: D,
            ...j
          } = e,
          { imgConf: R, showAltText: L, blurComplete: I, defaultLoader: F } = t,
          B = R || i.imageConfigDefault;
        if ("allSizes" in B) l = B;
        else {
          let e = [...B.deviceSizes, ...B.imageSizes].sort((e, t) => e - t),
            t = B.deviceSizes.sort((e, t) => e - t),
            r = null == (n = B.qualities) ? void 0 : n.sort((e, t) => e - t);
          l = { ...B, allSizes: e, deviceSizes: t, qualities: r };
        }
        if (void 0 === F)
          throw Error(
            "images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"
          );
        let N = j.loader || F;
        delete j.loader, delete j.srcSet;
        let H = "__next_img_default" in N;
        if (H) {
          if ("custom" === l.loader)
            throw Error(
              'Image with src "' +
                c +
                '" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader'
            );
        } else {
          let e = N;
          N = (t) => {
            let { config: n, ...r } = t;
            return e(r);
          };
        }
        if (E) {
          "fill" === E && (b = !0);
          let e = {
            intrinsic: { maxWidth: "100%", height: "auto" },
            responsive: { width: "100%", height: "auto" },
          }[E];
          e && (x = { ...x, ...e });
          let t = { responsive: "100vw", fill: "100vw" }[E];
          t && !h && (h = t);
        }
        let z = "",
          W = s(y),
          U = s(_);
        if ("object" == typeof (a = c) && (o(a) || void 0 !== a.src)) {
          let e = o(c) ? c.default : c;
          if (!e.src)
            throw Error(
              "An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received " +
                JSON.stringify(e)
            );
          if (!e.height || !e.width)
            throw Error(
              "An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received " +
                JSON.stringify(e)
            );
          if (
            ((u = e.blurWidth),
            (d = e.blurHeight),
            (S = S || e.blurDataURL),
            (z = e.src),
            !b)
          ) {
            if (W || U) {
              if (W && !U) {
                let t = W / e.width;
                U = Math.round(e.height * t);
              } else if (!W && U) {
                let t = U / e.height;
                W = Math.round(e.width * t);
              }
            } else (W = e.width), (U = e.height);
          }
        }
        let $ = !f && ("lazy" === m || void 0 === m);
        (!(c = "string" == typeof c ? c : z) ||
          c.startsWith("data:") ||
          c.startsWith("blob:")) &&
          ((p = !0), ($ = !1)),
          l.unoptimized && (p = !0),
          H && c.endsWith(".svg") && !l.dangerouslyAllowSVG && (p = !0),
          f && (k = "high");
        let G = s(v),
          X = Object.assign(
            b
              ? {
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  objectFit: M,
                  objectPosition: O,
                }
              : {},
            L ? {} : { color: "transparent" },
            x
          ),
          Z =
            I || "empty" === T
              ? null
              : "blur" === T
              ? 'url("data:image/svg+xml;charset=utf-8,' +
                (0, r.getImageBlurSvg)({
                  widthInt: W,
                  heightInt: U,
                  blurWidth: u,
                  blurHeight: d,
                  blurDataURL: S || "",
                  objectFit: X.objectFit,
                }) +
                '")'
              : 'url("' + T + '")',
          q = Z
            ? {
                backgroundSize: X.objectFit || "cover",
                backgroundPosition: X.objectPosition || "50% 50%",
                backgroundRepeat: "no-repeat",
                backgroundImage: Z,
              }
            : {},
          Y = (function (e) {
            let {
              config: t,
              src: n,
              unoptimized: r,
              width: i,
              quality: o,
              sizes: s,
              loader: a,
            } = e;
            if (r) return { src: n, srcSet: void 0, sizes: void 0 };
            let { widths: l, kind: u } = (function (e, t, n) {
                let { deviceSizes: r, allSizes: i } = e;
                if (n) {
                  let e = /(^|\s)(1?\d?\d)vw/g,
                    t = [];
                  for (let r; (r = e.exec(n)); r) t.push(parseInt(r[2]));
                  if (t.length) {
                    let e = 0.01 * Math.min(...t);
                    return {
                      widths: i.filter((t) => t >= r[0] * e),
                      kind: "w",
                    };
                  }
                  return { widths: i, kind: "w" };
                }
                return "number" != typeof t
                  ? { widths: r, kind: "w" }
                  : {
                      widths: [
                        ...new Set(
                          [t, 2 * t].map(
                            (e) => i.find((t) => t >= e) || i[i.length - 1]
                          )
                        ),
                      ],
                      kind: "x",
                    };
              })(t, i, s),
              d = l.length - 1;
            return {
              sizes: s || "w" !== u ? s : "100vw",
              srcSet: l
                .map(
                  (e, r) =>
                    a({ config: t, src: n, quality: o, width: e }) +
                    " " +
                    ("w" === u ? e : r + 1) +
                    u
                )
                .join(", "),
              src: a({ config: t, src: n, quality: o, width: l[d] }),
            };
          })({
            config: l,
            src: c,
            unoptimized: p,
            width: W,
            quality: G,
            sizes: h,
            loader: N,
          });
        return {
          props: {
            ...j,
            loading: $ ? "lazy" : m,
            fetchPriority: k,
            width: W,
            height: U,
            decoding: C,
            className: g,
            style: { ...X, ...q },
            sizes: Y.sizes,
            srcSet: Y.srcSet,
            src: w || Y.src,
          },
          meta: { unoptimized: p, priority: f, placeholder: T, fill: b },
        };
      }
    },
    8293: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          default: function () {
            return m;
          },
          defaultHead: function () {
            return c;
          },
        });
      let r = n(7043),
        i = n(3099),
        o = n(7437),
        s = i._(n(2265)),
        a = r._(n(7421)),
        l = n(1436),
        u = n(8701),
        d = n(9019);
      function c(e) {
        void 0 === e && (e = !1);
        let t = [(0, o.jsx)("meta", { charSet: "utf-8" })];
        return (
          e ||
            t.push(
              (0, o.jsx)("meta", {
                name: "viewport",
                content: "width=device-width",
              })
            ),
          t
        );
      }
      function h(e, t) {
        return "string" == typeof t || "number" == typeof t
          ? e
          : t.type === s.default.Fragment
          ? e.concat(
              s.default.Children.toArray(t.props.children).reduce(
                (e, t) =>
                  "string" == typeof t || "number" == typeof t
                    ? e
                    : e.concat(t),
                []
              )
            )
          : e.concat(t);
      }
      n(1765);
      let p = ["name", "httpEquiv", "charSet", "itemProp"];
      function f(e, t) {
        let { inAmpMode: n } = t;
        return e
          .reduce(h, [])
          .reverse()
          .concat(c(n).reverse())
          .filter(
            (function () {
              let e = new Set(),
                t = new Set(),
                n = new Set(),
                r = {};
              return (i) => {
                let o = !0,
                  s = !1;
                if (
                  i.key &&
                  "number" != typeof i.key &&
                  i.key.indexOf("$") > 0
                ) {
                  s = !0;
                  let t = i.key.slice(i.key.indexOf("$") + 1);
                  e.has(t) ? (o = !1) : e.add(t);
                }
                switch (i.type) {
                  case "title":
                  case "base":
                    t.has(i.type) ? (o = !1) : t.add(i.type);
                    break;
                  case "meta":
                    for (let e = 0, t = p.length; e < t; e++) {
                      let t = p[e];
                      if (i.props.hasOwnProperty(t)) {
                        if ("charSet" === t) n.has(t) ? (o = !1) : n.add(t);
                        else {
                          let e = i.props[t],
                            n = r[t] || new Set();
                          ("name" !== t || !s) && n.has(e)
                            ? (o = !1)
                            : (n.add(e), (r[t] = n));
                        }
                      }
                    }
                }
                return o;
              };
            })()
          )
          .reverse()
          .map((e, t) => {
            let r = e.key || t;
            if (
              !n &&
              "link" === e.type &&
              e.props.href &&
              [
                "https://fonts.googleapis.com/css",
                "https://use.typekit.net/",
              ].some((t) => e.props.href.startsWith(t))
            ) {
              let t = { ...(e.props || {}) };
              return (
                (t["data-href"] = t.href),
                (t.href = void 0),
                (t["data-optimized-fonts"] = !0),
                s.default.cloneElement(e, t)
              );
            }
            return s.default.cloneElement(e, { key: r });
          });
      }
      let m = function (e) {
        let { children: t } = e,
          n = (0, s.useContext)(l.AmpStateContext),
          r = (0, s.useContext)(u.HeadManagerContext);
        return (0, o.jsx)(a.default, {
          reduceComponentsToState: f,
          headManager: r,
          inAmpMode: (0, d.isInAmpMode)(n),
          children: t,
        });
      };
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    6496: function (e, t) {
      "use strict";
      function n(e) {
        let {
            widthInt: t,
            heightInt: n,
            blurWidth: r,
            blurHeight: i,
            blurDataURL: o,
            objectFit: s,
          } = e,
          a = r ? 40 * r : t,
          l = i ? 40 * i : n,
          u = a && l ? "viewBox='0 0 " + a + " " + l + "'" : "";
        return (
          "%3Csvg xmlns='http://www.w3.org/2000/svg' " +
          u +
          "%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='" +
          (u
            ? "none"
            : "contain" === s
            ? "xMidYMid"
            : "cover" === s
            ? "xMidYMid slice"
            : "none") +
          "' style='filter: url(%23b);' href='" +
          o +
          "'/%3E%3C/svg%3E"
        );
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "getImageBlurSvg", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
    },
    2589: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ImageConfigContext", {
          enumerable: !0,
          get: function () {
            return o;
          },
        });
      let r = n(7043)._(n(2265)),
        i = n(128),
        o = r.default.createContext(i.imageConfigDefault);
    },
    128: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          VALID_LOADERS: function () {
            return n;
          },
          imageConfigDefault: function () {
            return r;
          },
        });
      let n = ["default", "imgix", "cloudinary", "akamai", "custom"],
        r = {
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          path: "/_next/image",
          loader: "default",
          loaderFile: "",
          domains: [],
          disableStaticImages: !1,
          minimumCacheTTL: 60,
          formats: ["image/webp"],
          dangerouslyAllowSVG: !1,
          contentSecurityPolicy:
            "script-src 'none'; frame-src 'none'; sandbox;",
          contentDispositionType: "inline",
          localPatterns: void 0,
          remotePatterns: [],
          qualities: void 0,
          unoptimized: !1,
        };
    },
    8461: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          default: function () {
            return l;
          },
          getImageProps: function () {
            return a;
          },
        });
      let r = n(7043),
        i = n(5346),
        o = n(5878),
        s = r._(n(5084));
      function a(e) {
        let { props: t } = (0, i.getImgProps)(e, {
          defaultLoader: s.default,
          imgConf: {
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
            path: "/_next/image",
            loader: "default",
            dangerouslyAllowSVG: !1,
            unoptimized: !1,
          },
        });
        for (let [e, n] of Object.entries(t)) void 0 === n && delete t[e];
        return { props: t };
      }
      let l = o.Image;
    },
    5084: function (e, t) {
      "use strict";
      function n(e) {
        var t;
        let { config: n, src: r, width: i, quality: o } = e,
          s =
            o ||
            (null == (t = n.qualities)
              ? void 0
              : t.reduce((e, t) =>
                  Math.abs(t - 75) < Math.abs(e - 75) ? t : e
                )) ||
            75;
        return (r);
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return r;
          },
        }),
        (n.__next_img_default = !0);
      let r = n;
    },
    5523: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "RouterContext", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
      let r = n(7043)._(n(2265)).default.createContext(null);
    },
    7421: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return a;
          },
        });
      let r = n(2265),
        i = "undefined" == typeof window,
        o = i ? () => {} : r.useLayoutEffect,
        s = i ? () => {} : r.useEffect;
      function a(e) {
        let { headManager: t, reduceComponentsToState: n } = e;
        function a() {
          if (t && t.mountedInstances) {
            let i = r.Children.toArray(
              Array.from(t.mountedInstances).filter(Boolean)
            );
            t.updateHead(n(i, e));
          }
        }
        if (i) {
          var l;
          null == t || null == (l = t.mountedInstances) || l.add(e.children),
            a();
        }
        return (
          o(() => {
            var n;
            return (
              null == t ||
                null == (n = t.mountedInstances) ||
                n.add(e.children),
              () => {
                var n;
                null == t ||
                  null == (n = t.mountedInstances) ||
                  n.delete(e.children);
              }
            );
          }),
          o(
            () => (
              t && (t._pendingUpdate = a),
              () => {
                t && (t._pendingUpdate = a);
              }
            )
          ),
          s(
            () => (
              t &&
                t._pendingUpdate &&
                (t._pendingUpdate(), (t._pendingUpdate = null)),
              () => {
                t &&
                  t._pendingUpdate &&
                  (t._pendingUpdate(), (t._pendingUpdate = null));
              }
            )
          ),
          null
        );
      }
    },
    1772: function (e, t, n) {
      "use strict";
      var r = n(2265),
        i = r && "object" == typeof r && "default" in r ? r : { default: r };
      !(function (e) {
        if (!e || "undefined" == typeof window) return;
        let t = document.createElement("style");
        t.setAttribute("type", "text/css"),
          (t.innerHTML = e),
          document.head.appendChild(t);
      })(
        '.rfm-marquee-container {\n  overflow-x: hidden;\n  display: flex;\n  flex-direction: row;\n  position: relative;\n  width: var(--width);\n  transform: var(--transform);\n}\n.rfm-marquee-container:hover div {\n  animation-play-state: var(--pause-on-hover);\n}\n.rfm-marquee-container:active div {\n  animation-play-state: var(--pause-on-click);\n}\n\n.rfm-overlay {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n.rfm-overlay::before, .rfm-overlay::after {\n  background: linear-gradient(to right, var(--gradient-color), rgba(255, 255, 255, 0));\n  content: "";\n  height: 100%;\n  position: absolute;\n  width: var(--gradient-width);\n  z-index: 2;\n  pointer-events: none;\n  touch-action: none;\n}\n.rfm-overlay::after {\n  right: 0;\n  top: 0;\n  transform: rotateZ(180deg);\n}\n.rfm-overlay::before {\n  left: 0;\n  top: 0;\n}\n\n.rfm-marquee {\n  flex: 0 0 auto;\n  min-width: var(--min-width);\n  z-index: 1;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);\n  animation-play-state: var(--play);\n  animation-delay: var(--delay);\n  animation-direction: var(--direction);\n}\n@keyframes scroll {\n  0% {\n    transform: translateX(0%);\n  }\n  100% {\n    transform: translateX(-100%);\n  }\n}\n\n.rfm-initial-child-container {\n  flex: 0 0 auto;\n  display: flex;\n  min-width: auto;\n  flex-direction: row;\n  align-items: center;\n}\n\n.rfm-child {\n  transform: var(--transform);\n}'
      );
      let o = r.forwardRef(function (e, t) {
        let {
            style: n = {},
            className: o = "",
            autoFill: s = !1,
            play: a = !0,
            pauseOnHover: l = !1,
            pauseOnClick: u = !1,
            direction: d = "left",
            speed: c = 50,
            delay: h = 0,
            loop: p = 0,
            gradient: f = !1,
            gradientColor: m = "white",
            gradientWidth: g = 200,
            onFinish: v,
            onCycleComplete: y,
            onMount: _,
            children: b,
          } = e,
          [x, w] = r.useState(0),
          [A, P] = r.useState(0),
          [T, S] = r.useState(1),
          [k, C] = r.useState(!1),
          E = r.useRef(null),
          M = t || E,
          O = r.useRef(null),
          V = r.useCallback(() => {
            if (O.current && M.current) {
              let e = M.current.getBoundingClientRect(),
                t = O.current.getBoundingClientRect(),
                n = e.width,
                r = t.width;
              ("up" === d || "down" === d) && ((n = e.height), (r = t.height)),
                s && n && r ? S(r < n ? Math.ceil(n / r) : 1) : S(1),
                w(n),
                P(r);
            }
          }, [s, M, d]);
        r.useEffect(() => {
          if (k && (V(), O.current && M.current)) {
            let e = new ResizeObserver(() => V());
            return (
              e.observe(M.current),
              e.observe(O.current),
              () => {
                e && e.disconnect();
              }
            );
          }
        }, [V, M, k]),
          r.useEffect(() => {
            V();
          }, [V, b]),
          r.useEffect(() => {
            C(!0);
          }, []),
          r.useEffect(() => {
            "function" == typeof _ && _();
          }, []);
        let D = r.useMemo(
            () => (s ? (A * T) / c : A < x ? x / c : A / c),
            [s, x, A, T, c]
          ),
          j = r.useMemo(
            () =>
              Object.assign(Object.assign({}, n), {
                "--pause-on-hover": !a || l ? "paused" : "running",
                "--pause-on-click": !a || (l && !u) || u ? "paused" : "running",
                "--width": "up" === d || "down" === d ? "100vh" : "100%",
                "--transform":
                  "up" === d
                    ? "rotate(-90deg)"
                    : "down" === d
                    ? "rotate(90deg)"
                    : "none",
              }),
            [n, a, l, u, d]
          ),
          R = r.useMemo(
            () => ({
              "--gradient-color": m,
              "--gradient-width": "number" == typeof g ? "".concat(g, "px") : g,
            }),
            [m, g]
          ),
          L = r.useMemo(
            () => ({
              "--play": a ? "running" : "paused",
              "--direction": "left" === d ? "normal" : "reverse",
              "--duration": "".concat(D, "s"),
              "--delay": "".concat(h, "s"),
              "--iteration-count": p ? "".concat(p) : "infinite",
              "--min-width": s ? "auto" : "100%",
            }),
            [a, d, D, h, p, s]
          ),
          I = r.useMemo(
            () => ({
              "--transform":
                "up" === d
                  ? "rotate(90deg)"
                  : "down" === d
                  ? "rotate(-90deg)"
                  : "none",
            }),
            [d]
          ),
          F = r.useCallback(
            (e) =>
              [...Array(Number.isFinite(e) && e >= 0 ? e : 0)].map((e, t) =>
                i.default.createElement(
                  r.Fragment,
                  { key: t },
                  r.Children.map(b, (e) =>
                    i.default.createElement(
                      "div",
                      { style: I, className: "rfm-child" },
                      e
                    )
                  )
                )
              ),
            [I, b]
          );
        return k
          ? i.default.createElement(
              "div",
              { ref: M, style: j, className: "rfm-marquee-container " + o },
              f &&
                i.default.createElement("div", {
                  style: R,
                  className: "rfm-overlay",
                }),
              i.default.createElement(
                "div",
                {
                  className: "rfm-marquee",
                  style: L,
                  onAnimationIteration: y,
                  onAnimationEnd: v,
                },
                i.default.createElement(
                  "div",
                  { className: "rfm-initial-child-container", ref: O },
                  r.Children.map(b, (e) =>
                    i.default.createElement(
                      "div",
                      { style: I, className: "rfm-child" },
                      e
                    )
                  )
                ),
                F(T - 1)
              ),
              i.default.createElement(
                "div",
                { className: "rfm-marquee", style: L },
                F(T)
              )
            )
          : null;
      });
      t.Z = o;
    },
    472: function (e, t, n) {
      "use strict";
      n.d(t, {
        j: function () {
          return p;
        },
      });
      var r,
        i,
        o = n(2265),
        s = n(1435);
      function a() {
        return (a = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            }).apply(this, arguments);
      }
      function l(e) {
        if (void 0 === e)
          return {
            src: null,
            isReady: !1,
            isLoading: !1,
            looping: !1,
            duration: 0,
            rate: 1,
            volume: 1,
            muted: !1,
            playing: !1,
            paused: !1,
            stopped: !1,
            error: null,
          };
        var t = e.seek(),
          n = e.playing();
        return {
          isReady: "loaded" === e.state(),
          isLoading: "loading" === e.state(),
          src: e._src,
          looping: e.loop(),
          duration: e.duration(),
          rate: e.rate(),
          volume: e.volume(),
          muted: e.mute(),
          playing: n,
          paused: !n,
          stopped: !n && 0 === t,
          error: null,
        };
      }
      function u(e, t) {
        switch (t.type) {
          case i.START_LOAD:
            return a({}, l(), { isLoading: !0 });
          case i.ON_LOAD:
            if ("unloaded" === t.howl.state()) return e;
            return l(t.howl);
          case i.ON_ERROR:
            return a({}, l(), { error: t.message });
          case i.ON_PLAY:
            return a({}, e, { playing: !0, paused: !1, stopped: !1 });
          case i.ON_PAUSE:
            return a({}, e, { playing: !1, paused: !0 });
          case i.ON_STOP:
            return a({}, e, { playing: !1, paused: !1, stopped: !0 });
          case i.ON_END:
            return a({}, e, { playing: e.looping, stopped: !e.looping });
          case i.ON_MUTE:
            return a({}, e, {
              muted: null !== (n = t.howl.mute()) && void 0 !== n && n,
            });
          case i.ON_RATE:
            return a({}, e, {
              rate:
                null !==
                  (r =
                    null === (o = t.howl) || void 0 === o
                      ? void 0
                      : o.rate()) && void 0 !== r
                  ? r
                  : 1,
            });
          case i.ON_VOLUME:
            return a({}, e, {
              volume:
                null !==
                  (s =
                    null === (u = t.howl) || void 0 === u
                      ? void 0
                      : u.volume()) && void 0 !== s
                  ? s
                  : 1,
            });
          case i.ON_LOOP:
            var n,
              r,
              o,
              s,
              u,
              d = t.toggleValue,
              c = void 0 !== d && d;
            return t.howl.loop(c), a({}, e, { looping: c });
          default:
            return e;
        }
      }
      ((r = i || (i = {})).START_LOAD = "START_LOAD"),
        (r.ON_LOAD = "ON_LOAD"),
        (r.ON_ERROR = "ON_ERROR"),
        (r.ON_PLAY = "ON_PLAY"),
        (r.ON_PAUSE = "ON_PAUSE"),
        (r.ON_STOP = "ON_STOP"),
        (r.ON_END = "ON_END"),
        (r.ON_RATE = "ON_RATE"),
        (r.ON_MUTE = "ON_MUTE"),
        (r.ON_VOLUME = "ON_VOLUME"),
        (r.ON_LOOP = "ON_LOOP");
      var d = ["initialVolume", "initialRate", "initialMute"],
        c = (function () {
          function e() {
            (this.callbacks = new Map()),
              (this.howl = void 0),
              (this.options = {}),
              (this.subscriptionIndex = 0);
          }
          var t = e.prototype;
          return (
            (t.subscribe = function (e) {
              var t = (this.subscriptionIndex++).toString();
              return this.callbacks.set(t, e), t;
            }),
            (t.unsubscribe = function (e) {
              this.callbacks.delete(e);
            }),
            (t.getHowl = function () {
              return this.howl;
            }),
            (t.getNumberOfConnections = function () {
              return this.callbacks.size;
            }),
            (t.createHowl = function (e) {
              this.destroyHowl(), (this.options = e);
              var t = this.options,
                n = t.initialVolume,
                r = t.initialRate,
                o = t.initialMute,
                l = (function (e, t) {
                  if (null == e) return {};
                  var n,
                    r,
                    i = {},
                    o = Object.keys(e);
                  for (r = 0; r < o.length; r++)
                    (n = o[r]), t.indexOf(n) >= 0 || (i[n] = e[n]);
                  return i;
                })(t, d),
                u = new s.Howl(a({ mute: o, volume: n, rate: r }, l));
              return (
                this.callbacks.forEach(function (e) {
                  return e({ type: i.START_LOAD, howl: u });
                }),
                (this.howl = u),
                u
              );
            }),
            (t.destroyHowl = function () {
              var e, t, n, r, i, o;
              this.options.onload &&
                (null === (t = this.howl) ||
                  void 0 === t ||
                  t.off("load", this.options.onload)),
                this.options.onend &&
                  (null === (n = this.howl) ||
                    void 0 === n ||
                    n.off("end", this.options.onend)),
                this.options.onplay &&
                  (null === (r = this.howl) ||
                    void 0 === r ||
                    r.off("play", this.options.onplay)),
                this.options.onpause &&
                  (null === (i = this.howl) ||
                    void 0 === i ||
                    i.off("pause", this.options.onpause)),
                this.options.onstop &&
                  (null === (o = this.howl) ||
                    void 0 === o ||
                    o.off("stop", this.options.onstop)),
                null === (e = this.howl) || void 0 === e || e.unload();
            }),
            (t.broadcast = function (e) {
              this.callbacks.forEach(function (t) {
                return t(e);
              });
            }),
            e
          );
        })(),
        h = (function () {
          function e() {}
          return (
            (e.getInstance = function () {
              return (
                void 0 === this.instance && (e.instance = new c()), e.instance
              );
            }),
            e
          );
        })();
      function p() {
        var e,
          t,
          n,
          r,
          s,
          d,
          c,
          p,
          f,
          m,
          g,
          v,
          y,
          _ = (0, o.useRef)(h.getInstance()),
          b =
            ((e = _.current),
            (n = (t = (0, o.useReducer)(u, _.current.getHowl(), l))[0]),
            (r = t[1]),
            (s = (0, o.useCallback)(
              function () {
                var t = e.getHowl();
                void 0 !== t && r({ type: i.ON_LOAD, howl: t });
              },
              [r, e]
            )),
            (d = (0, o.useCallback)(
              function (e, t) {
                r({ type: i.ON_ERROR, message: t });
              },
              [r]
            )),
            (c = (0, o.useCallback)(
              function () {
                var t = e.getHowl();
                void 0 !== t && r({ type: i.ON_PLAY, howl: t });
              },
              [r, e]
            )),
            (p = (0, o.useCallback)(
              function () {
                var t = e.getHowl();
                void 0 !== t && r({ type: i.ON_PAUSE, howl: t });
              },
              [r, e]
            )),
            (f = (0, o.useCallback)(
              function () {
                var t = e.getHowl();
                void 0 !== t && r({ type: i.ON_END, howl: t });
              },
              [r, e]
            )),
            (m = (0, o.useCallback)(
              function () {
                var t = e.getHowl();
                void 0 !== t && r({ type: i.ON_STOP, howl: t });
              },
              [r, e]
            )),
            (g = (0, o.useCallback)(
              function () {
                var t = e.getHowl();
                void 0 !== t && r({ type: i.ON_MUTE, howl: t });
              },
              [r, e]
            )),
            (v = (0, o.useCallback)(
              function () {
                var t = e.getHowl();
                void 0 !== t && r({ type: i.ON_VOLUME, howl: t });
              },
              [r, e]
            )),
            (y = (0, o.useCallback)(
              function () {
                var t = e.getHowl();
                void 0 !== t && r({ type: i.ON_RATE, howl: t });
              },
              [r, e]
            )),
            (0, o.useEffect)(function () {
              return function () {
                var t = e.getHowl();
                null == t || t.off("loaderror", d),
                  null == t || t.off("playerror", d),
                  null == t || t.off("play", c),
                  null == t || t.off("pause", p),
                  null == t || t.off("end", f),
                  null == t || t.off("stop", m),
                  null == t || t.off("mute", g),
                  null == t || t.off("volume", v),
                  null == t || t.off("rate", y);
              };
            }, []),
            [
              n,
              (0, o.useRef)(function (e) {
                if (e.type === i.START_LOAD) {
                  var t = e.howl;
                  t.once("load", s),
                    t.on("loaderror", d),
                    t.on("playerror", d),
                    t.on("play", c),
                    t.on("pause", p),
                    t.on("end", f),
                    t.on("stop", m),
                    t.on("mute", g),
                    t.on("volume", v),
                    t.on("rate", y);
                }
                r(e);
              }).current,
            ]),
          x = b[0],
          w = b[1];
        (0, o.useEffect)(function () {
          var e = _.current.getHowl();
          void 0 !== e &&
            (w({ type: i.START_LOAD, howl: e }),
            "loaded" === e.state() && w({ type: i.ON_LOAD, howl: e }));
          var t = _.current.subscribe(function (e) {
            w(e);
          });
          return function () {
            _.current.unsubscribe(t);
          };
        }, []);
        var A = (0, o.useCallback)(function () {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            var r = t[0],
              i = t[1];
            _.current.createHowl(a({ src: r }, void 0 === i ? {} : i));
          }, []),
          P = (0, o.useCallback)(function (e) {
            var t = _.current.getHowl();
            void 0 !== t && t.seek(e);
          }, []),
          T = (0, o.useCallback)(function () {
            var e,
              t = _.current.getHowl();
            return void 0 === t
              ? 0
              : null !== (e = t.seek()) && void 0 !== e
              ? e
              : 0;
          }, []),
          S = (0, o.useCallback)(function () {
            var e = _.current.getHowl();
            void 0 !== e && e.play();
          }, []),
          k = (0, o.useCallback)(function () {
            var e = _.current.getHowl();
            void 0 !== e && e.pause();
          }, []),
          C = (0, o.useCallback)(
            function () {
              var e = _.current.getHowl();
              void 0 !== e && (x.playing ? e.pause() : e.play());
            },
            [x]
          ),
          E = (0, o.useCallback)(function () {
            var e = _.current.getHowl();
            void 0 !== e && e.stop();
          }, []),
          M = (0, o.useCallback)(function (e, t, n) {
            var r = _.current.getHowl();
            void 0 !== r && r.fade(e, t, n);
          }, []),
          O = (0, o.useCallback)(function (e) {
            var t = _.current.getHowl();
            void 0 !== t && t.rate(e);
          }, []),
          V = (0, o.useCallback)(function (e) {
            var t = _.current.getHowl();
            void 0 !== t && t.volume(e);
          }, []),
          D = (0, o.useCallback)(function (e) {
            var t = _.current.getHowl();
            void 0 !== t && t.mute(e);
          }, []),
          j = (0, o.useCallback)(function (e) {
            var t = _.current.getHowl();
            void 0 !== t &&
              _.current.broadcast({ type: i.ON_LOOP, howl: t, toggleValue: e });
          }, []);
        return a({}, x, {
          load: A,
          seek: P,
          getPosition: T,
          play: S,
          pause: k,
          togglePlayPause: C,
          stop: E,
          mute: D,
          fade: M,
          setRate: O,
          setVolume: V,
          loop: j,
        });
      }
      h.instance = void 0;
    },
    9653: function (e, t, n) {
      "use strict";
      n.d(t, {
        _: function () {
          return u;
        },
      });
      var r = n(3223),
        i = n(6179),
        o = n(5647);
      function s() {
        let e = !1,
          t = new Set(),
          n = {
            subscribe: (e) => (t.add(e), () => void t.delete(e)),
            start(n, i) {
              (0, r.k)(
                e,
                "controls.start() should only be called after a component has mounted. Consider calling within a useEffect hook."
              );
              let s = [];
              return (
                t.forEach((e) => {
                  s.push((0, o.d)(e, n, { transitionOverride: i }));
                }),
                Promise.all(s)
              );
            },
            set: (n) => (
              (0, r.k)(
                e,
                "controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook."
              ),
              t.forEach((e) => {
                (0, i.gg)(e, n);
              })
            ),
            stop() {
              t.forEach((e) => {
                !(function (e) {
                  e.values.forEach((e) => e.stop());
                })(e);
              });
            },
            mount: () => (
              (e = !0),
              () => {
                (e = !1), n.stop();
              }
            ),
          };
        return n;
      }
      var a = n(3576),
        l = n(1534);
      let u = function () {
        let e = (0, a.h)(s);
        return (0, l.L)(e.mount, []), e;
      };
    },
    5990: function (e, t, n) {
      "use strict";
      let r;
      n.d(t, {
        v: function () {
          return ew;
        },
      });
      var i,
        o = n(3223),
        s = n(6717);
      let a = { current: !1 },
        l = (e) => Array.isArray(e) && "number" == typeof e[0],
        u = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
        d = {
          linear: "linear",
          ease: "ease",
          easeIn: "ease-in",
          easeOut: "ease-out",
          easeInOut: "ease-in-out",
          circIn: u([0, 0.65, 0.55, 1]),
          circOut: u([0.55, 0, 1, 0.45]),
          backIn: u([0.31, 0.01, 0.66, -0.59]),
          backOut: u([0.33, 1.53, 0.69, 0.99]),
        };
      var c = n(4439);
      let h = (e, t, n) =>
        (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e;
      function p(e, t, n, r) {
        if (e === t && n === r) return c.Z;
        let i = (t) =>
          (function (e, t, n, r, i) {
            let o, s;
            let a = 0;
            do (o = h((s = t + (n - t) / 2), r, i) - e) > 0 ? (n = s) : (t = s);
            while (Math.abs(o) > 1e-7 && ++a < 12);
            return s;
          })(t, 0, 1, e, n);
        return (e) => (0 === e || 1 === e ? e : h(i(e), t, r));
      }
      let f = p(0.42, 0, 1, 1),
        m = p(0, 0, 0.58, 1),
        g = p(0.42, 0, 0.58, 1),
        v = (e) => Array.isArray(e) && "number" != typeof e[0];
      var y = n(6378),
        _ = n(7457),
        b = n(3627);
      let x = p(0.33, 1.53, 0.69, 0.99),
        w = (0, b.M)(x),
        A = (0, _.o)(w),
        P = {
          linear: c.Z,
          easeIn: f,
          easeInOut: g,
          easeOut: m,
          circIn: y.Z7,
          circInOut: y.X7,
          circOut: y.Bn,
          backIn: w,
          backInOut: A,
          backOut: x,
          anticipate: (e) =>
            (e *= 2) < 1 ? 0.5 * w(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))),
        },
        T = (e) => {
          if (Array.isArray(e)) {
            (0, o.k)(
              4 === e.length,
              "Cubic bezier arrays must contain four numerical values."
            );
            let [t, n, r, i] = e;
            return p(t, n, r, i);
          }
          return "string" == typeof e
            ? ((0, o.k)(void 0 !== P[e], `Invalid easing type '${e}'`), P[e])
            : e;
        };
      var S = n(3964),
        k = n(9111),
        C = n(8090);
      function E(e, t, n) {
        return (n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6)
          ? e + (t - e) * 6 * n
          : n < 0.5
          ? t
          : n < 2 / 3
          ? e + (t - e) * (2 / 3 - n) * 6
          : e;
      }
      var M = n(7325),
        O = n(8859),
        V = n(2943);
      let D = (e, t, n) => {
          let r = e * e;
          return Math.sqrt(Math.max(0, n * (t * t - r) + r));
        },
        j = [M.$, O.m, V.J],
        R = (e) => j.find((t) => t.test(e));
      function L(e) {
        let t = R(e);
        (0, o.k)(
          !!t,
          `'${e}' is not an animatable color. Use the equivalent color code instead.`
        );
        let n = t.parse(e);
        return (
          t === V.J &&
            (n = (function ({ hue: e, saturation: t, lightness: n, alpha: r }) {
              (e /= 360), (n /= 100);
              let i = 0,
                o = 0,
                s = 0;
              if ((t /= 100)) {
                let r = n < 0.5 ? n * (1 + t) : n + t - n * t,
                  a = 2 * n - r;
                (i = E(a, r, e + 1 / 3)),
                  (o = E(a, r, e)),
                  (s = E(a, r, e - 1 / 3));
              } else i = o = s = n;
              return {
                red: Math.round(255 * i),
                green: Math.round(255 * o),
                blue: Math.round(255 * s),
                alpha: r,
              };
            })(n)),
          n
        );
      }
      let I = (e, t) => {
        let n = L(e),
          r = L(t),
          i = { ...n };
        return (e) => (
          (i.red = D(n.red, r.red, e)),
          (i.green = D(n.green, r.green, e)),
          (i.blue = D(n.blue, r.blue, e)),
          (i.alpha = (0, C.C)(n.alpha, r.alpha, e)),
          O.m.transform(i)
        );
      };
      var F = n(332),
        B = n(5636);
      let N = (e, t) => (n) => `${n > 0 ? t : e}`;
      function H(e, t) {
        return "number" == typeof e
          ? (n) => (0, C.C)(e, t, n)
          : S.$.test(e)
          ? I(e, t)
          : e.startsWith("var(")
          ? N(e, t)
          : U(e, t);
      }
      let z = (e, t) => {
          let n = [...e],
            r = n.length,
            i = e.map((e, n) => H(e, t[n]));
          return (e) => {
            for (let t = 0; t < r; t++) n[t] = i[t](e);
            return n;
          };
        },
        W = (e, t) => {
          let n = { ...e, ...t },
            r = {};
          for (let i in n)
            void 0 !== e[i] && void 0 !== t[i] && (r[i] = H(e[i], t[i]));
          return (e) => {
            for (let t in r) n[t] = r[t](e);
            return n;
          };
        },
        U = (e, t) => {
          let n = B.P.createTransformer(t),
            r = (0, B.V)(e),
            i = (0, B.V)(t);
          return r.numVars === i.numVars &&
            r.numColors === i.numColors &&
            r.numNumbers >= i.numNumbers
            ? (0, F.z)(z(r.values, i.values), n)
            : ((0, o.K)(
                !0,
                `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`
              ),
              N(e, t));
        };
      var $ = n(6376);
      let G = (e, t) => (n) => (0, C.C)(e, t, n);
      function X(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
        let s = e.length;
        if (
          ((0, o.k)(
            s === t.length,
            "Both input and output ranges must be the same length"
          ),
          1 === s)
        )
          return () => t[0];
        e[0] > e[s - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
        let a = (function (e, t, n) {
            let r = [],
              i =
                n ||
                (function (e) {
                  if ("number" == typeof e);
                  else if ("string" == typeof e) return S.$.test(e) ? I : U;
                  else if (Array.isArray(e)) return z;
                  else if ("object" == typeof e) return W;
                  return G;
                })(e[0]),
              o = e.length - 1;
            for (let n = 0; n < o; n++) {
              let o = i(e[n], e[n + 1]);
              if (t) {
                let e = Array.isArray(t) ? t[n] || c.Z : t;
                o = (0, F.z)(e, o);
              }
              r.push(o);
            }
            return r;
          })(t, r, i),
          l = a.length,
          u = (t) => {
            let n = 0;
            if (l > 1) for (; n < e.length - 2 && !(t < e[n + 1]); n++);
            let r = (0, $.Y)(e[n], e[n + 1], t);
            return a[n](r);
          };
        return n ? (t) => u((0, k.u)(e[0], e[s - 1], t)) : u;
      }
      function Z({
        duration: e = 300,
        keyframes: t,
        times: n,
        ease: r = "easeInOut",
      }) {
        let i = v(r) ? r.map(T) : T(r),
          o = { done: !1, value: t[0] },
          s = X(
            (n && n.length === t.length
              ? n
              : (function (e) {
                  let t = [0];
                  return (
                    (function (e, t) {
                      let n = e[e.length - 1];
                      for (let r = 1; r <= t; r++) {
                        let i = (0, $.Y)(0, t, r);
                        e.push((0, C.C)(n, 1, i));
                      }
                    })(t, e.length - 1),
                    t
                  );
                })(t)
            ).map((t) => t * e),
            t,
            {
              ease: Array.isArray(i)
                ? i
                : t.map(() => i || g).splice(0, t.length - 1),
            }
          );
        return {
          calculatedDuration: e,
          next: (t) => ((o.value = s(t)), (o.done = t >= e), o),
        };
      }
      var q = n(4438);
      function Y(e, t, n) {
        let r = Math.max(t - 5, 0);
        return (0, q.R)(n - e(r), t - r);
      }
      function Q(e, t) {
        return e * Math.sqrt(1 - t * t);
      }
      let K = ["duration", "bounce"],
        J = ["stiffness", "damping", "mass"];
      function ee(e, t) {
        return t.some((t) => void 0 !== e[t]);
      }
      function et({ keyframes: e, restDelta: t, restSpeed: n, ...r }) {
        let i;
        let a = e[0],
          l = e[e.length - 1],
          u = { done: !1, value: a },
          {
            stiffness: d,
            damping: c,
            mass: h,
            duration: p,
            velocity: f,
            isResolvedFromDuration: m,
          } = (function (e) {
            let t = {
              velocity: 0,
              stiffness: 100,
              damping: 10,
              mass: 1,
              isResolvedFromDuration: !1,
              ...e,
            };
            if (!ee(e, J) && ee(e, K)) {
              let n = (function ({
                duration: e = 800,
                bounce: t = 0.25,
                velocity: n = 0,
                mass: r = 1,
              }) {
                let i, a;
                (0, o.K)(
                  e <= (0, s.w)(10),
                  "Spring duration must be 10 seconds or less"
                );
                let l = 1 - t;
                (l = (0, k.u)(0.05, 1, l)),
                  (e = (0, k.u)(0.01, 10, (0, s.X)(e))),
                  l < 1
                    ? ((i = (t) => {
                        let r = t * l,
                          i = r * e;
                        return 0.001 - ((r - n) / Q(t, l)) * Math.exp(-i);
                      }),
                      (a = (t) => {
                        let r = t * l * e,
                          o = Math.pow(l, 2) * Math.pow(t, 2) * e,
                          s = Q(Math.pow(t, 2), l);
                        return (
                          ((r * n + n - o) *
                            Math.exp(-r) *
                            (-i(t) + 0.001 > 0 ? -1 : 1)) /
                          s
                        );
                      }))
                    : ((i = (t) =>
                        -0.001 + Math.exp(-t * e) * ((t - n) * e + 1)),
                      (a = (t) => e * e * (n - t) * Math.exp(-t * e)));
                let u = (function (e, t, n) {
                  let r = n;
                  for (let n = 1; n < 12; n++) r -= e(r) / t(r);
                  return r;
                })(i, a, 5 / e);
                if (((e = (0, s.w)(e)), isNaN(u)))
                  return { stiffness: 100, damping: 10, duration: e };
                {
                  let t = Math.pow(u, 2) * r;
                  return {
                    stiffness: t,
                    damping: 2 * l * Math.sqrt(r * t),
                    duration: e,
                  };
                }
              })(e);
              (t = { ...t, ...n, mass: 1 }).isResolvedFromDuration = !0;
            }
            return t;
          })({ ...r, velocity: -(0, s.X)(r.velocity || 0) }),
          g = f || 0,
          v = c / (2 * Math.sqrt(d * h)),
          y = l - a,
          _ = (0, s.X)(Math.sqrt(d / h)),
          b = 5 > Math.abs(y);
        if ((n || (n = b ? 0.01 : 2), t || (t = b ? 0.005 : 0.5), v < 1)) {
          let e = Q(_, v);
          i = (t) =>
            l -
            Math.exp(-v * _ * t) *
              (((g + v * _ * y) / e) * Math.sin(e * t) + y * Math.cos(e * t));
        } else if (1 === v)
          i = (e) => l - Math.exp(-_ * e) * (y + (g + _ * y) * e);
        else {
          let e = _ * Math.sqrt(v * v - 1);
          i = (t) => {
            let n = Math.exp(-v * _ * t),
              r = Math.min(e * t, 300);
            return (
              l -
              (n * ((g + v * _ * y) * Math.sinh(r) + e * y * Math.cosh(r))) / e
            );
          };
        }
        return {
          calculatedDuration: (m && p) || null,
          next: (e) => {
            let r = i(e);
            if (m) u.done = e >= p;
            else {
              let o = g;
              0 !== e && (o = v < 1 ? Y(i, e, r) : 0);
              let s = Math.abs(o) <= n,
                a = Math.abs(l - r) <= t;
              u.done = s && a;
            }
            return (u.value = u.done ? l : r), u;
          },
        };
      }
      function en({
        keyframes: e,
        velocity: t = 0,
        power: n = 0.8,
        timeConstant: r = 325,
        bounceDamping: i = 10,
        bounceStiffness: o = 500,
        modifyTarget: s,
        min: a,
        max: l,
        restDelta: u = 0.5,
        restSpeed: d,
      }) {
        let c, h;
        let p = e[0],
          f = { done: !1, value: p },
          m = (e) => (void 0 !== a && e < a) || (void 0 !== l && e > l),
          g = (e) =>
            void 0 === a
              ? l
              : void 0 === l
              ? a
              : Math.abs(a - e) < Math.abs(l - e)
              ? a
              : l,
          v = n * t,
          y = p + v,
          _ = void 0 === s ? y : s(y);
        _ !== y && (v = _ - p);
        let b = (e) => -v * Math.exp(-e / r),
          x = (e) => _ + b(e),
          w = (e) => {
            let t = b(e),
              n = x(e);
            (f.done = Math.abs(t) <= u), (f.value = f.done ? _ : n);
          },
          A = (e) => {
            m(f.value) &&
              ((c = e),
              (h = et({
                keyframes: [f.value, g(f.value)],
                velocity: Y(x, e, f.value),
                damping: i,
                stiffness: o,
                restDelta: u,
                restSpeed: d,
              })));
          };
        return (
          A(0),
          {
            calculatedDuration: null,
            next: (e) => {
              let t = !1;
              return (h || void 0 !== c || ((t = !0), w(e), A(e)),
              void 0 !== c && e > c)
                ? h.next(e - c)
                : (t || w(e), f);
            },
          }
        );
      }
      var er = n(8345);
      let ei = (e) => {
        let t = ({ timestamp: t }) => e(t);
        return {
          start: () => er.Wi.update(t, !0),
          stop: () => (0, er.Pn)(t),
          now: () =>
            er.frameData.isProcessing
              ? er.frameData.timestamp
              : performance.now(),
        };
      };
      function eo(e) {
        let t = 0,
          n = e.next(t);
        for (; !n.done && t < 2e4; ) (t += 50), (n = e.next(t));
        return t >= 2e4 ? 1 / 0 : t;
      }
      let es = { decay: en, inertia: en, tween: Z, keyframes: Z, spring: et };
      function ea({
        autoplay: e = !0,
        delay: t = 0,
        driver: n = ei,
        keyframes: r,
        type: i = "keyframes",
        repeat: o = 0,
        repeatDelay: a = 0,
        repeatType: l = "loop",
        onPlay: u,
        onStop: d,
        onComplete: c,
        onUpdate: h,
        ...p
      }) {
        let f,
          m,
          g,
          v,
          y,
          _ = 1,
          b = !1,
          x = () => {
            m = new Promise((e) => {
              f = e;
            });
          };
        x();
        let w = es[i] || Z;
        w !== Z &&
          "number" != typeof r[0] &&
          ((v = X([0, 100], r, { clamp: !1 })), (r = [0, 100]));
        let A = w({ ...p, keyframes: r });
        "mirror" === l &&
          (y = w({
            ...p,
            keyframes: [...r].reverse(),
            velocity: -(p.velocity || 0),
          }));
        let P = "idle",
          T = null,
          S = null,
          C = null;
        null === A.calculatedDuration && o && (A.calculatedDuration = eo(A));
        let { calculatedDuration: E } = A,
          M = 1 / 0,
          O = 1 / 0;
        null !== E && (O = (M = E + a) * (o + 1) - a);
        let V = 0,
          D = (e) => {
            if (null === S) return;
            _ > 0 && (S = Math.min(S, e)),
              _ < 0 && (S = Math.min(e - O / _, S));
            let n =
                (V = null !== T ? T : Math.round(e - S) * _) -
                t * (_ >= 0 ? 1 : -1),
              i = _ >= 0 ? n < 0 : n > O;
            (V = Math.max(n, 0)), "finished" === P && null === T && (V = O);
            let s = V,
              u = A;
            if (o) {
              let e = Math.min(V, O) / M,
                t = Math.floor(e),
                n = e % 1;
              !n && e >= 1 && (n = 1),
                1 === n && t--,
                (t = Math.min(t, o + 1)) % 2 &&
                  ("reverse" === l
                    ? ((n = 1 - n), a && (n -= a / M))
                    : "mirror" === l && (u = y)),
                (s = (0, k.u)(0, 1, n) * M);
            }
            let d = i ? { done: !1, value: r[0] } : u.next(s);
            v && (d.value = v(d.value));
            let { done: c } = d;
            i || null === E || (c = _ >= 0 ? V >= O : V <= 0);
            let p = null === T && ("finished" === P || ("running" === P && c));
            return h && h(d.value), p && L(), d;
          },
          j = () => {
            g && g.stop(), (g = void 0);
          },
          R = () => {
            (P = "idle"), j(), f(), x(), (S = C = null);
          },
          L = () => {
            (P = "finished"), c && c(), j(), f();
          },
          I = () => {
            if (b) return;
            g || (g = n(D));
            let e = g.now();
            u && u(),
              null !== T ? (S = e - T) : (S && "finished" !== P) || (S = e),
              "finished" === P && x(),
              (C = S),
              (T = null),
              (P = "running"),
              g.start();
          };
        e && I();
        let F = {
          then: (e, t) => m.then(e, t),
          get time() {
            return (0, s.X)(V);
          },
          set time(newTime) {
            (V = newTime = (0, s.w)(newTime)),
              null === T && g && 0 !== _
                ? (S = g.now() - newTime / _)
                : (T = newTime);
          },
          get duration() {
            let e =
              null === A.calculatedDuration ? eo(A) : A.calculatedDuration;
            return (0, s.X)(e);
          },
          get speed() {
            return _;
          },
          set speed(newSpeed) {
            if (newSpeed === _ || !g) return;
            (_ = newSpeed), (F.time = (0, s.X)(V));
          },
          get state() {
            return P;
          },
          play: I,
          pause: () => {
            (P = "paused"), (T = V);
          },
          stop: () => {
            (b = !0), "idle" !== P && ((P = "idle"), d && d(), R());
          },
          cancel: () => {
            null !== C && D(C), R();
          },
          complete: () => {
            P = "finished";
          },
          sample: (e) => ((S = 0), D(e)),
        };
        return F;
      }
      let el =
          ((i = () => Object.hasOwnProperty.call(Element.prototype, "animate")),
          () => (void 0 === r && (r = i()), r)),
        eu = new Set([
          "opacity",
          "clipPath",
          "filter",
          "transform",
          "backgroundColor",
        ]),
        ed = (e, t) =>
          "spring" === t.type ||
          "backgroundColor" === e ||
          !(function e(t) {
            return !!(
              !t ||
              ("string" == typeof t && d[t]) ||
              l(t) ||
              (Array.isArray(t) && t.every(e))
            );
          })(t.ease);
      var ec = n(8834);
      let eh = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
        ep = (e) => ({
          type: "spring",
          stiffness: 550,
          damping: 0 === e ? 2 * Math.sqrt(550) : 30,
          restSpeed: 10,
        }),
        ef = { type: "keyframes", duration: 0.8 },
        em = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
        eg = (e, { keyframes: t }) =>
          t.length > 2
            ? ef
            : ec.G.has(e)
            ? e.startsWith("scale")
              ? ep(t[1])
              : eh
            : em,
        ev = (e, t) =>
          "zIndex" !== e &&
          !!(
            "number" == typeof t ||
            Array.isArray(t) ||
            ("string" == typeof t &&
              (B.P.test(t) || "0" === t) &&
              !t.startsWith("url("))
          );
      var ey = n(5861),
        e_ = n(3697),
        eb = n(9573);
      let ex = { skipAnimations: !1 },
        ew =
          (e, t, n, r = {}) =>
          (i) => {
            let h = (0, eb.e)(r, e) || {},
              p = h.delay || r.delay || 0,
              { elapsed: f = 0 } = r;
            f -= (0, s.w)(p);
            let m = (function (e, t, n, r) {
                let i, o;
                let s = ev(t, n);
                i = Array.isArray(n) ? [...n] : [null, n];
                let a = void 0 !== r.from ? r.from : e.get(),
                  l = [];
                for (let e = 0; e < i.length; e++) {
                  var u;
                  null === i[e] && (i[e] = 0 === e ? a : i[e - 1]),
                    ("number" == typeof (u = i[e])
                      ? 0 === u
                      : null !== u
                      ? "none" === u || "0" === u || (0, e_.W)(u)
                      : void 0) && l.push(e),
                    "string" == typeof i[e] &&
                      "none" !== i[e] &&
                      "0" !== i[e] &&
                      (o = i[e]);
                }
                if (s && l.length && o)
                  for (let e = 0; e < l.length; e++) i[l[e]] = (0, ey.T)(t, o);
                return i;
              })(t, e, n, h),
              g = m[0],
              v = m[m.length - 1],
              y = ev(e, g),
              _ = ev(e, v);
            (0, o.K)(
              y === _,
              `You are trying to animate ${e} from "${g}" to "${v}". ${g} is not an animatable value - to enable this animation set ${g} to a value animatable to ${v} via the \`style\` property.`
            );
            let b = {
              keyframes: m,
              velocity: t.getVelocity(),
              ease: "easeOut",
              ...h,
              delay: -f,
              onUpdate: (e) => {
                t.set(e), h.onUpdate && h.onUpdate(e);
              },
              onComplete: () => {
                i(), h.onComplete && h.onComplete();
              },
            };
            if (
              ((0, eb.r)(h) || (b = { ...b, ...eg(e, b) }),
              b.duration && (b.duration = (0, s.w)(b.duration)),
              b.repeatDelay && (b.repeatDelay = (0, s.w)(b.repeatDelay)),
              !y || !_ || a.current || !1 === h.type || ex.skipAnimations)
            )
              return (function ({
                keyframes: e,
                delay: t,
                onUpdate: n,
                onComplete: r,
              }) {
                let i = () => (
                  n && n(e[e.length - 1]),
                  r && r(),
                  {
                    time: 0,
                    speed: 1,
                    duration: 0,
                    play: c.Z,
                    pause: c.Z,
                    stop: c.Z,
                    then: (e) => (e(), Promise.resolve()),
                    cancel: c.Z,
                    complete: c.Z,
                  }
                );
                return t
                  ? ea({
                      keyframes: [0, 1],
                      duration: 0,
                      delay: t,
                      onComplete: i,
                    })
                  : i();
              })(a.current ? { ...b, delay: 0 } : b);
            if (
              !r.isHandoff &&
              t.owner &&
              t.owner.current instanceof HTMLElement &&
              !t.owner.getProps().onUpdate
            ) {
              let n = (function (e, t, { onUpdate: n, onComplete: r, ...i }) {
                let o, a;
                if (
                  !(
                    el() &&
                    eu.has(t) &&
                    !i.repeatDelay &&
                    "mirror" !== i.repeatType &&
                    0 !== i.damping &&
                    "inertia" !== i.type
                  )
                )
                  return !1;
                let h = !1,
                  p = !1,
                  f = () => {
                    a = new Promise((e) => {
                      o = e;
                    });
                  };
                f();
                let { keyframes: m, duration: g = 300, ease: v, times: y } = i;
                if (ed(t, i)) {
                  let e = ea({ ...i, repeat: 0, delay: 0 }),
                    t = { done: !1, value: m[0] },
                    n = [],
                    r = 0;
                  for (; !t.done && r < 2e4; )
                    (t = e.sample(r)), n.push(t.value), (r += 10);
                  (y = void 0), (m = n), (g = r - 10), (v = "linear");
                }
                let _ = (function (
                    e,
                    t,
                    n,
                    {
                      delay: r = 0,
                      duration: i,
                      repeat: o = 0,
                      repeatType: s = "loop",
                      ease: a,
                      times: c,
                    } = {}
                  ) {
                    let h = { [t]: n };
                    c && (h.offset = c);
                    let p = (function e(t) {
                      if (t)
                        return l(t) ? u(t) : Array.isArray(t) ? t.map(e) : d[t];
                    })(a);
                    return (
                      Array.isArray(p) && (h.easing = p),
                      e.animate(h, {
                        delay: r,
                        duration: i,
                        easing: Array.isArray(p) ? "linear" : p,
                        fill: "both",
                        iterations: o + 1,
                        direction: "reverse" === s ? "alternate" : "normal",
                      })
                    );
                  })(e.owner.current, t, m, {
                    ...i,
                    duration: g,
                    ease: v,
                    times: y,
                  }),
                  b = () => {
                    (p = !1), _.cancel();
                  },
                  x = () => {
                    (p = !0), er.Wi.update(b), o(), f();
                  };
                return (
                  (_.onfinish = () => {
                    p ||
                      (e.set(
                        (function (e, { repeat: t, repeatType: n = "loop" }) {
                          let r =
                            t && "loop" !== n && t % 2 == 1 ? 0 : e.length - 1;
                          return e[r];
                        })(m, i)
                      ),
                      r && r(),
                      x());
                  }),
                  {
                    then: (e, t) => a.then(e, t),
                    attachTimeline: (e) => (
                      (_.timeline = e), (_.onfinish = null), c.Z
                    ),
                    get time() {
                      return (0, s.X)(_.currentTime || 0);
                    },
                    set time(newTime) {
                      _.currentTime = (0, s.w)(newTime);
                    },
                    get speed() {
                      return _.playbackRate;
                    },
                    set speed(newSpeed) {
                      _.playbackRate = newSpeed;
                    },
                    get duration() {
                      return (0, s.X)(g);
                    },
                    play: () => {
                      h || (_.play(), (0, er.Pn)(b));
                    },
                    pause: () => _.pause(),
                    stop: () => {
                      if (((h = !0), "idle" === _.playState)) return;
                      let { currentTime: t } = _;
                      if (t) {
                        let n = ea({ ...i, autoplay: !1 });
                        e.setWithVelocity(
                          n.sample(t - 10).value,
                          n.sample(t).value,
                          10
                        );
                      }
                      x();
                    },
                    complete: () => {
                      p || _.finish();
                    },
                    cancel: x,
                  }
                );
              })(t, e, b);
              if (n) return n;
            }
            return ea(b);
          };
    },
    5647: function (e, t, n) {
      "use strict";
      n.d(t, {
        d: function () {
          return f;
        },
      });
      var r = n(8775),
        i = n(8834),
        o = n(1750),
        s = n(5990),
        a = n(9593),
        l = n(6179),
        u = n(9573),
        d = n(8345);
      function c(e, t, { delay: n = 0, transitionOverride: r, type: c } = {}) {
        let {
            transition: h = e.getDefaultTransition(),
            transitionEnd: p,
            ...f
          } = e.makeTargetAnimatable(t),
          m = e.getValue("willChange");
        r && (h = r);
        let g = [],
          v = c && e.animationState && e.animationState.getState()[c];
        for (let t in f) {
          let r = e.getValue(t),
            l = f[t];
          if (
            !r ||
            void 0 === l ||
            (v &&
              (function ({ protectedKeys: e, needsAnimating: t }, n) {
                let r = e.hasOwnProperty(n) && !0 !== t[n];
                return (t[n] = !1), r;
              })(v, t))
          )
            continue;
          let c = { delay: n, elapsed: 0, ...(0, u.e)(h || {}, t) };
          if (window.HandoffAppearAnimations) {
            let n = e.getProps()[o.M];
            if (n) {
              let e = window.HandoffAppearAnimations(n, t, r, d.Wi);
              null !== e && ((c.elapsed = e), (c.isHandoff = !0));
            }
          }
          let p =
            !c.isHandoff &&
            !(function (e, t) {
              let n = e.get();
              if (!Array.isArray(t)) return n !== t;
              for (let e = 0; e < t.length; e++) if (t[e] !== n) return !0;
            })(r, l);
          if (
            ("spring" === c.type && (r.getVelocity() || c.velocity) && (p = !1),
            r.animation && (p = !1),
            p)
          )
            continue;
          r.start(
            (0, s.v)(
              t,
              r,
              l,
              e.shouldReduceMotion && i.G.has(t) ? { type: !1 } : c
            )
          );
          let y = r.animation;
          (0, a.L)(m) && (m.add(t), y.then(() => m.remove(t))), g.push(y);
        }
        return (
          p &&
            Promise.all(g).then(() => {
              p && (0, l.CD)(e, p);
            }),
          g
        );
      }
      function h(e, t, n = {}) {
        let i = (0, r.x)(e, t, n.custom),
          { transition: o = e.getDefaultTransition() || {} } = i || {};
        n.transitionOverride && (o = n.transitionOverride);
        let s = i ? () => Promise.all(c(e, i, n)) : () => Promise.resolve(),
          a =
            e.variantChildren && e.variantChildren.size
              ? (r = 0) => {
                  let {
                    delayChildren: i = 0,
                    staggerChildren: s,
                    staggerDirection: a,
                  } = o;
                  return (function (e, t, n = 0, r = 0, i = 1, o) {
                    let s = [],
                      a = (e.variantChildren.size - 1) * r,
                      l = 1 === i ? (e = 0) => e * r : (e = 0) => a - e * r;
                    return (
                      Array.from(e.variantChildren)
                        .sort(p)
                        .forEach((e, r) => {
                          e.notify("AnimationStart", t),
                            s.push(
                              h(e, t, { ...o, delay: n + l(r) }).then(() =>
                                e.notify("AnimationComplete", t)
                              )
                            );
                        }),
                      Promise.all(s)
                    );
                  })(e, t, i + r, s, a, n);
                }
              : () => Promise.resolve(),
          { when: l } = o;
        if (!l) return Promise.all([s(), a(n.delay)]);
        {
          let [e, t] = "beforeChildren" === l ? [s, a] : [a, s];
          return e().then(() => t());
        }
      }
      function p(e, t) {
        return e.sortNodePosition(t);
      }
      function f(e, t, n = {}) {
        let i;
        if ((e.notify("AnimationStart", t), Array.isArray(t)))
          i = Promise.all(t.map((t) => h(e, t, n)));
        else if ("string" == typeof t) i = h(e, t, n);
        else {
          let o = "function" == typeof t ? (0, r.x)(e, t, n.custom) : t;
          i = Promise.all(c(e, o, n));
        }
        return i.then(() => e.notify("AnimationComplete", t));
      }
    },
    1750: function (e, t, n) {
      "use strict";
      n.d(t, {
        M: function () {
          return r;
        },
      });
      let r = "data-" + (0, n(7444).D)("framerAppearId");
    },
    4944: function (e, t, n) {
      "use strict";
      n.d(t, {
        C: function () {
          return r;
        },
      });
      let r = (e) => Array.isArray(e);
    },
    9573: function (e, t, n) {
      "use strict";
      function r({
        when: e,
        delay: t,
        delayChildren: n,
        staggerChildren: r,
        staggerDirection: i,
        repeat: o,
        repeatType: s,
        repeatDelay: a,
        from: l,
        elapsed: u,
        ...d
      }) {
        return !!Object.keys(d).length;
      }
      function i(e, t) {
        return e[t] || e.default || e;
      }
      n.d(t, {
        e: function () {
          return i;
        },
        r: function () {
          return r;
        },
      });
    },
    6378: function (e, t, n) {
      "use strict";
      n.d(t, {
        Bn: function () {
          return s;
        },
        X7: function () {
          return a;
        },
        Z7: function () {
          return o;
        },
      });
      var r = n(7457),
        i = n(3627);
      let o = (e) => 1 - Math.sin(Math.acos(e)),
        s = (0, i.M)(o),
        a = (0, r.o)(o);
    },
    7457: function (e, t, n) {
      "use strict";
      n.d(t, {
        o: function () {
          return r;
        },
      });
      let r = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2;
    },
    3627: function (e, t, n) {
      "use strict";
      n.d(t, {
        M: function () {
          return r;
        },
      });
      let r = (e) => (t) => 1 - e(1 - t);
    },
    8345: function (e, t, n) {
      "use strict";
      n.d(t, {
        Pn: function () {
          return a;
        },
        Wi: function () {
          return s;
        },
        frameData: function () {
          return l;
        },
        S6: function () {
          return u;
        },
      });
      var r = n(4439);
      class i {
        constructor() {
          (this.order = []), (this.scheduled = new Set());
        }
        add(e) {
          if (!this.scheduled.has(e))
            return this.scheduled.add(e), this.order.push(e), !0;
        }
        remove(e) {
          let t = this.order.indexOf(e);
          -1 !== t && (this.order.splice(t, 1), this.scheduled.delete(e));
        }
        clear() {
          (this.order.length = 0), this.scheduled.clear();
        }
      }
      let o = [
          "prepare",
          "read",
          "update",
          "preRender",
          "render",
          "postRender",
        ],
        {
          schedule: s,
          cancel: a,
          state: l,
          steps: u,
        } = (function (e, t) {
          let n = !1,
            r = !0,
            s = { delta: 0, timestamp: 0, isProcessing: !1 },
            a = o.reduce(
              (e, t) => (
                (e[t] = (function (e) {
                  let t = new i(),
                    n = new i(),
                    r = 0,
                    o = !1,
                    s = !1,
                    a = new WeakSet(),
                    l = {
                      schedule: (e, i = !1, s = !1) => {
                        let l = s && o,
                          u = l ? t : n;
                        return (
                          i && a.add(e),
                          u.add(e) && l && o && (r = t.order.length),
                          e
                        );
                      },
                      cancel: (e) => {
                        n.remove(e), a.delete(e);
                      },
                      process: (i) => {
                        if (o) {
                          s = !0;
                          return;
                        }
                        if (
                          ((o = !0),
                          ([t, n] = [n, t]),
                          n.clear(),
                          (r = t.order.length))
                        )
                          for (let n = 0; n < r; n++) {
                            let r = t.order[n];
                            r(i), a.has(r) && (l.schedule(r), e());
                          }
                        (o = !1), s && ((s = !1), l.process(i));
                      },
                    };
                  return l;
                })(() => (n = !0))),
                e
              ),
              {}
            ),
            l = (e) => a[e].process(s),
            u = () => {
              let i = performance.now();
              (n = !1),
                (s.delta = r
                  ? 1e3 / 60
                  : Math.max(Math.min(i - s.timestamp, 40), 1)),
                (s.timestamp = i),
                (s.isProcessing = !0),
                o.forEach(l),
                (s.isProcessing = !1),
                n && t && ((r = !1), e(u));
            },
            d = () => {
              (n = !0), (r = !0), s.isProcessing || e(u);
            };
          return {
            schedule: o.reduce((e, t) => {
              let r = a[t];
              return (
                (e[t] = (e, t = !1, i = !1) => (n || d(), r.schedule(e, t, i))),
                e
              );
            }, {}),
            cancel: (e) => o.forEach((t) => a[t].cancel(e)),
            state: s,
            steps: a,
          };
        })(
          "undefined" != typeof requestAnimationFrame
            ? requestAnimationFrame
            : r.Z,
          !0
        );
    },
    9880: function (e, t, n) {
      "use strict";
      n.d(t, {
        E: function () {
          return n8;
        },
      });
      var r,
        i = n(2265);
      let o = (0, i.createContext)({
          transformPagePoint: (e) => e,
          isStatic: !1,
          reducedMotion: "never",
        }),
        s = (0, i.createContext)({}),
        a = (0, i.createContext)(null);
      var l = n(1534);
      let u = (0, i.createContext)({ strict: !1 });
      var d = n(1750);
      function c(e) {
        return (
          e &&
          "object" == typeof e &&
          Object.prototype.hasOwnProperty.call(e, "current")
        );
      }
      function h(e) {
        return "string" == typeof e || Array.isArray(e);
      }
      function p(e) {
        return (
          null !== e && "object" == typeof e && "function" == typeof e.start
        );
      }
      let f = [
          "animate",
          "whileInView",
          "whileFocus",
          "whileHover",
          "whileTap",
          "whileDrag",
          "exit",
        ],
        m = ["initial", ...f];
      function g(e) {
        return p(e.animate) || m.some((t) => h(e[t]));
      }
      function v(e) {
        return !!(g(e) || e.variants);
      }
      function y(e) {
        return Array.isArray(e) ? e.join(" ") : e;
      }
      let _ = {
          animation: [
            "animate",
            "variants",
            "whileHover",
            "whileTap",
            "exit",
            "whileInView",
            "whileFocus",
            "whileDrag",
          ],
          exit: ["exit"],
          drag: ["drag", "dragControls"],
          focus: ["whileFocus"],
          hover: ["whileHover", "onHoverStart", "onHoverEnd"],
          tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
          pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
          inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
          layout: ["layout", "layoutId"],
        },
        b = {};
      for (let e in _) b[e] = { isEnabled: (t) => _[e].some((e) => !!t[e]) };
      var x = n(4563);
      let w = (0, i.createContext)({}),
        A = (0, i.createContext)({}),
        P = Symbol.for("motionComponentSymbol"),
        T = [
          "animate",
          "circle",
          "defs",
          "desc",
          "ellipse",
          "g",
          "image",
          "line",
          "filter",
          "marker",
          "mask",
          "metadata",
          "path",
          "pattern",
          "polygon",
          "polyline",
          "rect",
          "stop",
          "switch",
          "symbol",
          "svg",
          "text",
          "tspan",
          "use",
          "view",
        ];
      function S(e) {
        if ("string" != typeof e || e.includes("-"));
        else if (T.indexOf(e) > -1 || /[A-Z]/.test(e)) return !0;
        return !1;
      }
      let k = {};
      var C = n(8834);
      function E(e, { layout: t, layoutId: n }) {
        return (
          C.G.has(e) ||
          e.startsWith("origin") ||
          ((t || void 0 !== n) && (!!k[e] || "opacity" === e))
        );
      }
      var M = n(3999);
      let O = {
          x: "translateX",
          y: "translateY",
          z: "translateZ",
          transformPerspective: "perspective",
        },
        V = C._.length;
      var D = n(7249);
      let j = (e, t) => (t && "number" == typeof e ? t.transform(e) : e);
      var R = n(8325);
      function L(e, t, n, r) {
        let { style: i, vars: o, transform: s, transformOrigin: a } = e,
          l = !1,
          u = !1,
          d = !0;
        for (let e in t) {
          let n = t[e];
          if ((0, D.f9)(e)) {
            o[e] = n;
            continue;
          }
          let r = R.j[e],
            c = j(n, r);
          if (C.G.has(e)) {
            if (((l = !0), (s[e] = c), !d)) continue;
            n !== (r.default || 0) && (d = !1);
          } else e.startsWith("origin") ? ((u = !0), (a[e] = c)) : (i[e] = c);
        }
        if (
          (!t.transform &&
            (l || r
              ? (i.transform = (function (
                  e,
                  {
                    enableHardwareAcceleration: t = !0,
                    allowTransformNone: n = !0,
                  },
                  r,
                  i
                ) {
                  let o = "";
                  for (let t = 0; t < V; t++) {
                    let n = C._[t];
                    if (void 0 !== e[n]) {
                      let t = O[n] || n;
                      o += `${t}(${e[n]}) `;
                    }
                  }
                  return (
                    t && !e.z && (o += "translateZ(0)"),
                    (o = o.trim()),
                    i ? (o = i(e, r ? "" : o)) : n && r && (o = "none"),
                    o
                  );
                })(e.transform, n, d, r))
              : i.transform && (i.transform = "none")),
          u)
        ) {
          let { originX: e = "50%", originY: t = "50%", originZ: n = 0 } = a;
          i.transformOrigin = `${e} ${t} ${n}`;
        }
      }
      let I = () => ({
        style: {},
        transform: {},
        transformOrigin: {},
        vars: {},
      });
      function F(e, t, n) {
        for (let r in t) (0, M.i)(t[r]) || E(r, n) || (e[r] = t[r]);
      }
      let B = new Set([
        "animate",
        "exit",
        "variants",
        "initial",
        "style",
        "values",
        "variants",
        "transition",
        "transformTemplate",
        "transformValues",
        "custom",
        "inherit",
        "onBeforeLayoutMeasure",
        "onAnimationStart",
        "onAnimationComplete",
        "onUpdate",
        "onDragStart",
        "onDrag",
        "onDragEnd",
        "onMeasureDragConstraints",
        "onDirectionLock",
        "onDragTransitionEnd",
        "_dragX",
        "_dragY",
        "onHoverStart",
        "onHoverEnd",
        "onViewportEnter",
        "onViewportLeave",
        "globalTapTarget",
        "ignoreStrict",
        "viewport",
      ]);
      function N(e) {
        return (
          e.startsWith("while") ||
          (e.startsWith("drag") && "draggable" !== e) ||
          e.startsWith("layout") ||
          e.startsWith("onTap") ||
          e.startsWith("onPan") ||
          e.startsWith("onLayout") ||
          B.has(e)
        );
      }
      let H = (e) => !N(e);
      try {
        (r = require("@emotion/is-prop-valid").default) &&
          (H = (e) => (e.startsWith("on") ? !N(e) : r(e)));
      } catch (e) {}
      var z = n(7492);
      function W(e, t, n) {
        return "string" == typeof e ? e : z.px.transform(t + n * e);
      }
      let U = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
        $ = { offset: "strokeDashoffset", array: "strokeDasharray" };
      function G(
        e,
        {
          attrX: t,
          attrY: n,
          attrScale: r,
          originX: i,
          originY: o,
          pathLength: s,
          pathSpacing: a = 1,
          pathOffset: l = 0,
          ...u
        },
        d,
        c,
        h
      ) {
        if ((L(e, u, d, h), c)) {
          e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
          return;
        }
        (e.attrs = e.style), (e.style = {});
        let { attrs: p, style: f, dimensions: m } = e;
        p.transform && (m && (f.transform = p.transform), delete p.transform),
          m &&
            (void 0 !== i || void 0 !== o || f.transform) &&
            (f.transformOrigin = (function (e, t, n) {
              let r = W(t, e.x, e.width),
                i = W(n, e.y, e.height);
              return `${r} ${i}`;
            })(m, void 0 !== i ? i : 0.5, void 0 !== o ? o : 0.5)),
          void 0 !== t && (p.x = t),
          void 0 !== n && (p.y = n),
          void 0 !== r && (p.scale = r),
          void 0 !== s &&
            (function (e, t, n = 1, r = 0, i = !0) {
              e.pathLength = 1;
              let o = i ? U : $;
              e[o.offset] = z.px.transform(-r);
              let s = z.px.transform(t),
                a = z.px.transform(n);
              e[o.array] = `${s} ${a}`;
            })(p, s, a, l, !1);
      }
      let X = () => ({ ...I(), attrs: {} }),
        Z = (e) => "string" == typeof e && "svg" === e.toLowerCase();
      var q = n(7444);
      function Y(e, { style: t, vars: n }, r, i) {
        for (let o in (Object.assign(e.style, t, i && i.getProjectionStyles(r)),
        n))
          e.style.setProperty(o, n[o]);
      }
      let Q = new Set([
        "baseFrequency",
        "diffuseConstant",
        "kernelMatrix",
        "kernelUnitLength",
        "keySplines",
        "keyTimes",
        "limitingConeAngle",
        "markerHeight",
        "markerWidth",
        "numOctaves",
        "targetX",
        "targetY",
        "surfaceScale",
        "specularConstant",
        "specularExponent",
        "stdDeviation",
        "tableValues",
        "viewBox",
        "gradientTransform",
        "pathLength",
        "startOffset",
        "textLength",
        "lengthAdjust",
      ]);
      function K(e, t, n, r) {
        for (let n in (Y(e, t, void 0, r), t.attrs))
          e.setAttribute(Q.has(n) ? n : (0, q.D)(n), t.attrs[n]);
      }
      function J(e, t) {
        let { style: n } = e,
          r = {};
        for (let i in n)
          ((0, M.i)(n[i]) || (t.style && (0, M.i)(t.style[i])) || E(i, e)) &&
            (r[i] = n[i]);
        return r;
      }
      function ee(e, t) {
        let n = J(e, t);
        for (let r in e)
          ((0, M.i)(e[r]) || (0, M.i)(t[r])) &&
            (n[
              -1 !== C._.indexOf(r)
                ? "attr" + r.charAt(0).toUpperCase() + r.substring(1)
                : r
            ] = e[r]);
        return n;
      }
      var et = n(1297),
        en = n(3576),
        er = n(4581);
      function ei(e) {
        let t = (0, M.i)(e) ? e.get() : e;
        return (0, er.p)(t) ? t.toValue() : t;
      }
      let eo = (e) => (t, n) => {
        let r = (0, i.useContext)(s),
          o = (0, i.useContext)(a),
          l = () =>
            (function (
              {
                scrapeMotionValuesFromProps: e,
                createRenderState: t,
                onMount: n,
              },
              r,
              i,
              o
            ) {
              let s = {
                latestValues: (function (e, t, n, r) {
                  let i = {},
                    o = r(e, {});
                  for (let e in o) i[e] = ei(o[e]);
                  let { initial: s, animate: a } = e,
                    l = g(e),
                    u = v(e);
                  t &&
                    u &&
                    !l &&
                    !1 !== e.inherit &&
                    (void 0 === s && (s = t.initial),
                    void 0 === a && (a = t.animate));
                  let d = !!n && !1 === n.initial,
                    c = (d = d || !1 === s) ? a : s;
                  return (
                    c &&
                      "boolean" != typeof c &&
                      !p(c) &&
                      (Array.isArray(c) ? c : [c]).forEach((t) => {
                        let n = (0, et.o)(e, t);
                        if (!n) return;
                        let { transitionEnd: r, transition: o, ...s } = n;
                        for (let e in s) {
                          let t = s[e];
                          if (Array.isArray(t)) {
                            let e = d ? t.length - 1 : 0;
                            t = t[e];
                          }
                          null !== t && (i[e] = t);
                        }
                        for (let e in r) i[e] = r[e];
                      }),
                    i
                  );
                })(r, i, o, e),
                renderState: t(),
              };
              return n && (s.mount = (e) => n(r, e, s)), s;
            })(e, t, r, o);
        return n ? l() : (0, en.h)(l);
      };
      var es = n(8345);
      let ea = {
          useVisualState: eo({
            scrapeMotionValuesFromProps: ee,
            createRenderState: X,
            onMount: (e, t, { renderState: n, latestValues: r }) => {
              es.Wi.read(() => {
                try {
                  n.dimensions =
                    "function" == typeof t.getBBox
                      ? t.getBBox()
                      : t.getBoundingClientRect();
                } catch (e) {
                  n.dimensions = { x: 0, y: 0, width: 0, height: 0 };
                }
              }),
                es.Wi.render(() => {
                  G(
                    n,
                    r,
                    { enableHardwareAcceleration: !1 },
                    Z(t.tagName),
                    e.transformTemplate
                  ),
                    K(t, n);
                });
            },
          }),
        },
        el = {
          useVisualState: eo({
            scrapeMotionValuesFromProps: J,
            createRenderState: I,
          }),
        };
      function eu(e, t, n, r = { passive: !0 }) {
        return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
      }
      let ed = (e) =>
        "mouse" === e.pointerType
          ? "number" != typeof e.button || e.button <= 0
          : !1 !== e.isPrimary;
      function ec(e, t = "page") {
        return { point: { x: e[t + "X"], y: e[t + "Y"] } };
      }
      let eh = (e) => (t) => ed(t) && e(t, ec(t));
      function ep(e, t, n, r) {
        return eu(e, t, eh(n), r);
      }
      var ef = n(332);
      function em(e) {
        let t = null;
        return () =>
          null === t &&
          ((t = e),
          () => {
            t = null;
          });
      }
      let eg = em("dragHorizontal"),
        ev = em("dragVertical");
      function ey(e) {
        let t = !1;
        if ("y" === e) t = ev();
        else if ("x" === e) t = eg();
        else {
          let e = eg(),
            n = ev();
          e && n
            ? (t = () => {
                e(), n();
              })
            : (e && e(), n && n());
        }
        return t;
      }
      function e_() {
        let e = ey(!0);
        return !e || (e(), !1);
      }
      class eb {
        constructor(e) {
          (this.isMounted = !1), (this.node = e);
        }
        update() {}
      }
      function ex(e, t) {
        let n = "onHover" + (t ? "Start" : "End");
        return ep(
          e.current,
          "pointer" + (t ? "enter" : "leave"),
          (r, i) => {
            if ("touch" === r.pointerType || e_()) return;
            let o = e.getProps();
            e.animationState &&
              o.whileHover &&
              e.animationState.setActive("whileHover", t),
              o[n] && es.Wi.update(() => o[n](r, i));
          },
          { passive: !e.getProps()[n] }
        );
      }
      class ew extends eb {
        mount() {
          this.unmount = (0, ef.z)(ex(this.node, !0), ex(this.node, !1));
        }
        unmount() {}
      }
      class eA extends eb {
        constructor() {
          super(...arguments), (this.isActive = !1);
        }
        onFocus() {
          let e = !1;
          try {
            e = this.node.current.matches(":focus-visible");
          } catch (t) {
            e = !0;
          }
          e &&
            this.node.animationState &&
            (this.node.animationState.setActive("whileFocus", !0),
            (this.isActive = !0));
        }
        onBlur() {
          this.isActive &&
            this.node.animationState &&
            (this.node.animationState.setActive("whileFocus", !1),
            (this.isActive = !1));
        }
        mount() {
          this.unmount = (0, ef.z)(
            eu(this.node.current, "focus", () => this.onFocus()),
            eu(this.node.current, "blur", () => this.onBlur())
          );
        }
        unmount() {}
      }
      let eP = (e, t) => !!t && (e === t || eP(e, t.parentElement));
      var eT = n(4439);
      function eS(e, t) {
        if (!t) return;
        let n = new PointerEvent("pointer" + e);
        t(n, ec(n));
      }
      class ek extends eb {
        constructor() {
          super(...arguments),
            (this.removeStartListeners = eT.Z),
            (this.removeEndListeners = eT.Z),
            (this.removeAccessibleListeners = eT.Z),
            (this.startPointerPress = (e, t) => {
              if (this.isPressing) return;
              this.removeEndListeners();
              let n = this.node.getProps(),
                r = ep(
                  window,
                  "pointerup",
                  (e, t) => {
                    if (!this.checkPressEnd()) return;
                    let {
                      onTap: n,
                      onTapCancel: r,
                      globalTapTarget: i,
                    } = this.node.getProps();
                    es.Wi.update(() => {
                      i || eP(this.node.current, e.target)
                        ? n && n(e, t)
                        : r && r(e, t);
                    });
                  },
                  { passive: !(n.onTap || n.onPointerUp) }
                ),
                i = ep(
                  window,
                  "pointercancel",
                  (e, t) => this.cancelPress(e, t),
                  { passive: !(n.onTapCancel || n.onPointerCancel) }
                );
              (this.removeEndListeners = (0, ef.z)(r, i)),
                this.startPress(e, t);
            }),
            (this.startAccessiblePress = () => {
              let e = eu(this.node.current, "keydown", (e) => {
                  "Enter" !== e.key ||
                    this.isPressing ||
                    (this.removeEndListeners(),
                    (this.removeEndListeners = eu(
                      this.node.current,
                      "keyup",
                      (e) => {
                        "Enter" === e.key &&
                          this.checkPressEnd() &&
                          eS("up", (e, t) => {
                            let { onTap: n } = this.node.getProps();
                            n && es.Wi.update(() => n(e, t));
                          });
                      }
                    )),
                    eS("down", (e, t) => {
                      this.startPress(e, t);
                    }));
                }),
                t = eu(this.node.current, "blur", () => {
                  this.isPressing &&
                    eS("cancel", (e, t) => this.cancelPress(e, t));
                });
              this.removeAccessibleListeners = (0, ef.z)(e, t);
            });
        }
        startPress(e, t) {
          this.isPressing = !0;
          let { onTapStart: n, whileTap: r } = this.node.getProps();
          r &&
            this.node.animationState &&
            this.node.animationState.setActive("whileTap", !0),
            n && es.Wi.update(() => n(e, t));
        }
        checkPressEnd() {
          return (
            this.removeEndListeners(),
            (this.isPressing = !1),
            this.node.getProps().whileTap &&
              this.node.animationState &&
              this.node.animationState.setActive("whileTap", !1),
            !e_()
          );
        }
        cancelPress(e, t) {
          if (!this.checkPressEnd()) return;
          let { onTapCancel: n } = this.node.getProps();
          n && es.Wi.update(() => n(e, t));
        }
        mount() {
          let e = this.node.getProps(),
            t = ep(
              e.globalTapTarget ? window : this.node.current,
              "pointerdown",
              this.startPointerPress,
              { passive: !(e.onTapStart || e.onPointerStart) }
            ),
            n = eu(this.node.current, "focus", this.startAccessiblePress);
          this.removeStartListeners = (0, ef.z)(t, n);
        }
        unmount() {
          this.removeStartListeners(),
            this.removeEndListeners(),
            this.removeAccessibleListeners();
        }
      }
      let eC = new WeakMap(),
        eE = new WeakMap(),
        eM = (e) => {
          let t = eC.get(e.target);
          t && t(e);
        },
        eO = (e) => {
          e.forEach(eM);
        },
        eV = { some: 0, all: 1 };
      class eD extends eb {
        constructor() {
          super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
        }
        startObserver() {
          this.unmount();
          let { viewport: e = {} } = this.node.getProps(),
            { root: t, margin: n, amount: r = "some", once: i } = e,
            o = {
              root: t ? t.current : void 0,
              rootMargin: n,
              threshold: "number" == typeof r ? r : eV[r],
            };
          return (function (e, t, n) {
            let r = (function ({ root: e, ...t }) {
              let n = e || document;
              eE.has(n) || eE.set(n, {});
              let r = eE.get(n),
                i = JSON.stringify(t);
              return (
                r[i] ||
                  (r[i] = new IntersectionObserver(eO, { root: e, ...t })),
                r[i]
              );
            })(t);
            return (
              eC.set(e, n),
              r.observe(e),
              () => {
                eC.delete(e), r.unobserve(e);
              }
            );
          })(this.node.current, o, (e) => {
            let { isIntersecting: t } = e;
            if (
              this.isInView === t ||
              ((this.isInView = t), i && !t && this.hasEnteredView)
            )
              return;
            t && (this.hasEnteredView = !0),
              this.node.animationState &&
                this.node.animationState.setActive("whileInView", t);
            let { onViewportEnter: n, onViewportLeave: r } =
                this.node.getProps(),
              o = t ? n : r;
            o && o(e);
          });
        }
        mount() {
          this.startObserver();
        }
        update() {
          if ("undefined" == typeof IntersectionObserver) return;
          let { props: e, prevProps: t } = this.node;
          ["amount", "margin", "root"].some(
            (function ({ viewport: e = {} }, { viewport: t = {} } = {}) {
              return (n) => e[n] !== t[n];
            })(e, t)
          ) && this.startObserver();
        }
        unmount() {}
      }
      var ej = n(4944);
      function eR(e, t) {
        if (!Array.isArray(t)) return !1;
        let n = t.length;
        if (n !== e.length) return !1;
        for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
        return !0;
      }
      var eL = n(8775),
        eI = n(5647);
      let eF = [...f].reverse(),
        eB = f.length;
      function eN(e = !1) {
        return {
          isActive: e,
          protectedKeys: {},
          needsAnimating: {},
          prevResolvedValues: {},
        };
      }
      class eH extends eb {
        constructor(e) {
          super(e),
            e.animationState ||
              (e.animationState = (function (e) {
                let t = (t) =>
                    Promise.all(
                      t.map(({ animation: t, options: n }) =>
                        (0, eI.d)(e, t, n)
                      )
                    ),
                  n = {
                    animate: eN(!0),
                    whileInView: eN(),
                    whileHover: eN(),
                    whileTap: eN(),
                    whileDrag: eN(),
                    whileFocus: eN(),
                    exit: eN(),
                  },
                  r = !0,
                  i = (t, n) => {
                    let r = (0, eL.x)(e, n);
                    if (r) {
                      let { transition: e, transitionEnd: n, ...i } = r;
                      t = { ...t, ...i, ...n };
                    }
                    return t;
                  };
                function o(o, s) {
                  let a = e.getProps(),
                    l = e.getVariantContext(!0) || {},
                    u = [],
                    d = new Set(),
                    c = {},
                    f = 1 / 0;
                  for (let t = 0; t < eB; t++) {
                    var m;
                    let g = eF[t],
                      v = n[g],
                      y = void 0 !== a[g] ? a[g] : l[g],
                      _ = h(y),
                      b = g === s ? v.isActive : null;
                    !1 === b && (f = t);
                    let x = y === l[g] && y !== a[g] && _;
                    if (
                      (x && r && e.manuallyAnimateOnMount && (x = !1),
                      (v.protectedKeys = { ...c }),
                      (!v.isActive && null === b) ||
                        (!y && !v.prevProp) ||
                        p(y) ||
                        "boolean" == typeof y)
                    )
                      continue;
                    let w =
                        ((m = v.prevProp),
                        ("string" == typeof y
                          ? y !== m
                          : !!Array.isArray(y) && !eR(y, m)) ||
                          (g === s && v.isActive && !x && _) ||
                          (t > f && _)),
                      A = !1,
                      P = Array.isArray(y) ? y : [y],
                      T = P.reduce(i, {});
                    !1 === b && (T = {});
                    let { prevResolvedValues: S = {} } = v,
                      k = { ...S, ...T },
                      C = (e) => {
                        (w = !0),
                          d.has(e) && ((A = !0), d.delete(e)),
                          (v.needsAnimating[e] = !0);
                      };
                    for (let e in k) {
                      let t = T[e],
                        n = S[e];
                      if (!c.hasOwnProperty(e))
                        ((0, ej.C)(t) && (0, ej.C)(n) ? eR(t, n) : t === n)
                          ? void 0 !== t && d.has(e)
                            ? C(e)
                            : (v.protectedKeys[e] = !0)
                          : void 0 !== t
                          ? C(e)
                          : d.add(e);
                    }
                    (v.prevProp = y),
                      (v.prevResolvedValues = T),
                      v.isActive && (c = { ...c, ...T }),
                      r && e.blockInitialAnimation && (w = !1),
                      w &&
                        (!x || A) &&
                        u.push(
                          ...P.map((e) => ({
                            animation: e,
                            options: { type: g, ...o },
                          }))
                        );
                  }
                  if (d.size) {
                    let t = {};
                    d.forEach((n) => {
                      let r = e.getBaseTarget(n);
                      void 0 !== r && (t[n] = r);
                    }),
                      u.push({ animation: t });
                  }
                  let g = !!u.length;
                  return (
                    r &&
                      (!1 === a.initial || a.initial === a.animate) &&
                      !e.manuallyAnimateOnMount &&
                      (g = !1),
                    (r = !1),
                    g ? t(u) : Promise.resolve()
                  );
                }
                return {
                  animateChanges: o,
                  setActive: function (t, r, i) {
                    var s;
                    if (n[t].isActive === r) return Promise.resolve();
                    null === (s = e.variantChildren) ||
                      void 0 === s ||
                      s.forEach((e) => {
                        var n;
                        return null === (n = e.animationState) || void 0 === n
                          ? void 0
                          : n.setActive(t, r);
                      }),
                      (n[t].isActive = r);
                    let a = o(i, t);
                    for (let e in n) n[e].protectedKeys = {};
                    return a;
                  },
                  setAnimateFunction: function (n) {
                    t = n(e);
                  },
                  getState: () => n,
                };
              })(e));
        }
        updateAnimationControlsSubscription() {
          let { animate: e } = this.node.getProps();
          this.unmount(), p(e) && (this.unmount = e.subscribe(this.node));
        }
        mount() {
          this.updateAnimationControlsSubscription();
        }
        update() {
          let { animate: e } = this.node.getProps(),
            { animate: t } = this.node.prevProps || {};
          e !== t && this.updateAnimationControlsSubscription();
        }
        unmount() {}
      }
      let ez = 0;
      class eW extends eb {
        constructor() {
          super(...arguments), (this.id = ez++);
        }
        update() {
          if (!this.node.presenceContext) return;
          let {
              isPresent: e,
              onExitComplete: t,
              custom: n,
            } = this.node.presenceContext,
            { isPresent: r } = this.node.prevPresenceContext || {};
          if (!this.node.animationState || e === r) return;
          let i = this.node.animationState.setActive("exit", !e, {
            custom: null != n ? n : this.node.getProps().custom,
          });
          t && !e && i.then(() => t(this.id));
        }
        mount() {
          let { register: e } = this.node.presenceContext || {};
          e && (this.unmount = e(this.id));
        }
        unmount() {}
      }
      var eU = n(3223),
        e$ = n(6717);
      let eG = (e, t) => Math.abs(e - t);
      class eX {
        constructor(
          e,
          t,
          {
            transformPagePoint: n,
            contextWindow: r,
            dragSnapToOrigin: i = !1,
          } = {}
        ) {
          if (
            ((this.startEvent = null),
            (this.lastMoveEvent = null),
            (this.lastMoveEventInfo = null),
            (this.handlers = {}),
            (this.contextWindow = window),
            (this.updatePoint = () => {
              var e, t;
              if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
              let n = eY(this.lastMoveEventInfo, this.history),
                r = null !== this.startEvent,
                i =
                  ((e = n.offset),
                  (t = { x: 0, y: 0 }),
                  Math.sqrt(eG(e.x, t.x) ** 2 + eG(e.y, t.y) ** 2) >= 3);
              if (!r && !i) return;
              let { point: o } = n,
                { timestamp: s } = es.frameData;
              this.history.push({ ...o, timestamp: s });
              let { onStart: a, onMove: l } = this.handlers;
              r ||
                (a && a(this.lastMoveEvent, n),
                (this.startEvent = this.lastMoveEvent)),
                l && l(this.lastMoveEvent, n);
            }),
            (this.handlePointerMove = (e, t) => {
              (this.lastMoveEvent = e),
                (this.lastMoveEventInfo = eZ(t, this.transformPagePoint)),
                es.Wi.update(this.updatePoint, !0);
            }),
            (this.handlePointerUp = (e, t) => {
              this.end();
              let {
                onEnd: n,
                onSessionEnd: r,
                resumeAnimation: i,
              } = this.handlers;
              if (
                (this.dragSnapToOrigin && i && i(),
                !(this.lastMoveEvent && this.lastMoveEventInfo))
              )
                return;
              let o = eY(
                "pointercancel" === e.type
                  ? this.lastMoveEventInfo
                  : eZ(t, this.transformPagePoint),
                this.history
              );
              this.startEvent && n && n(e, o), r && r(e, o);
            }),
            !ed(e))
          )
            return;
          (this.dragSnapToOrigin = i),
            (this.handlers = t),
            (this.transformPagePoint = n),
            (this.contextWindow = r || window);
          let o = eZ(ec(e), this.transformPagePoint),
            { point: s } = o,
            { timestamp: a } = es.frameData;
          this.history = [{ ...s, timestamp: a }];
          let { onSessionStart: l } = t;
          l && l(e, eY(o, this.history)),
            (this.removeListeners = (0, ef.z)(
              ep(this.contextWindow, "pointermove", this.handlePointerMove),
              ep(this.contextWindow, "pointerup", this.handlePointerUp),
              ep(this.contextWindow, "pointercancel", this.handlePointerUp)
            ));
        }
        updateHandlers(e) {
          this.handlers = e;
        }
        end() {
          this.removeListeners && this.removeListeners(),
            (0, es.Pn)(this.updatePoint);
        }
      }
      function eZ(e, t) {
        return t ? { point: t(e.point) } : e;
      }
      function eq(e, t) {
        return { x: e.x - t.x, y: e.y - t.y };
      }
      function eY({ point: e }, t) {
        return {
          point: e,
          delta: eq(e, eQ(t)),
          offset: eq(e, t[0]),
          velocity: (function (e, t) {
            if (e.length < 2) return { x: 0, y: 0 };
            let n = e.length - 1,
              r = null,
              i = eQ(e);
            for (
              ;
              n >= 0 &&
              ((r = e[n]), !(i.timestamp - r.timestamp > (0, e$.w)(0.1)));

            )
              n--;
            if (!r) return { x: 0, y: 0 };
            let o = (0, e$.X)(i.timestamp - r.timestamp);
            if (0 === o) return { x: 0, y: 0 };
            let s = { x: (i.x - r.x) / o, y: (i.y - r.y) / o };
            return s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s;
          })(t, 0),
        };
      }
      function eQ(e) {
        return e[e.length - 1];
      }
      var eK = n(6376),
        eJ = n(8090);
      function e0(e) {
        return e.max - e.min;
      }
      function e1(e, t = 0, n = 0.01) {
        return Math.abs(e - t) <= n;
      }
      function e3(e, t, n, r = 0.5) {
        (e.origin = r),
          (e.originPoint = (0, eJ.C)(t.min, t.max, e.origin)),
          (e.scale = e0(n) / e0(t)),
          (e1(e.scale, 1, 1e-4) || isNaN(e.scale)) && (e.scale = 1),
          (e.translate = (0, eJ.C)(n.min, n.max, e.origin) - e.originPoint),
          (e1(e.translate) || isNaN(e.translate)) && (e.translate = 0);
      }
      function e5(e, t, n, r) {
        e3(e.x, t.x, n.x, r ? r.originX : void 0),
          e3(e.y, t.y, n.y, r ? r.originY : void 0);
      }
      function e2(e, t, n) {
        (e.min = n.min + t.min), (e.max = e.min + e0(t));
      }
      function e4(e, t, n) {
        (e.min = t.min - n.min), (e.max = e.min + e0(t));
      }
      function e6(e, t, n) {
        e4(e.x, t.x, n.x), e4(e.y, t.y, n.y);
      }
      var e9 = n(9111);
      function e7(e, t, n) {
        return {
          min: void 0 !== t ? e.min + t : void 0,
          max: void 0 !== n ? e.max + n - (e.max - e.min) : void 0,
        };
      }
      function e8(e, t) {
        let n = t.min - e.min,
          r = t.max - e.max;
        return (
          t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r }
        );
      }
      function te(e, t, n) {
        return { min: tt(e, t), max: tt(e, n) };
      }
      function tt(e, t) {
        return "number" == typeof e ? e : e[t] || 0;
      }
      let tn = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
        tr = () => ({ x: tn(), y: tn() }),
        ti = () => ({ min: 0, max: 0 }),
        to = () => ({ x: ti(), y: ti() });
      function ts(e) {
        return [e("x"), e("y")];
      }
      function ta({ top: e, left: t, right: n, bottom: r }) {
        return { x: { min: t, max: n }, y: { min: e, max: r } };
      }
      function tl(e) {
        return void 0 === e || 1 === e;
      }
      function tu({ scale: e, scaleX: t, scaleY: n }) {
        return !tl(e) || !tl(t) || !tl(n);
      }
      function td(e) {
        return tu(e) || tc(e) || e.z || e.rotate || e.rotateX || e.rotateY;
      }
      function tc(e) {
        var t, n;
        return ((t = e.x) && "0%" !== t) || ((n = e.y) && "0%" !== n);
      }
      function th(e, t, n, r, i) {
        return void 0 !== i && (e = r + i * (e - r)), r + n * (e - r) + t;
      }
      function tp(e, t = 0, n = 1, r, i) {
        (e.min = th(e.min, t, n, r, i)), (e.max = th(e.max, t, n, r, i));
      }
      function tf(e, { x: t, y: n }) {
        tp(e.x, t.translate, t.scale, t.originPoint),
          tp(e.y, n.translate, n.scale, n.originPoint);
      }
      function tm(e) {
        return Number.isInteger(e)
          ? e
          : e > 1.0000000000001 || e < 0.999999999999
          ? e
          : 1;
      }
      function tg(e, t) {
        (e.min = e.min + t), (e.max = e.max + t);
      }
      function tv(e, t, [n, r, i]) {
        let o = void 0 !== t[i] ? t[i] : 0.5,
          s = (0, eJ.C)(e.min, e.max, o);
        tp(e, t[n], t[r], s, t.scale);
      }
      let ty = ["x", "scaleX", "originX"],
        t_ = ["y", "scaleY", "originY"];
      function tb(e, t) {
        tv(e.x, t, ty), tv(e.y, t, t_);
      }
      function tx(e, t) {
        return ta(
          (function (e, t) {
            if (!t) return e;
            let n = t({ x: e.left, y: e.top }),
              r = t({ x: e.right, y: e.bottom });
            return { top: n.y, left: n.x, bottom: r.y, right: r.x };
          })(e.getBoundingClientRect(), t)
        );
      }
      var tw = n(5990);
      let tA = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
        tP = new WeakMap();
      class tT {
        constructor(e) {
          (this.openGlobalLock = null),
            (this.isDragging = !1),
            (this.currentDirection = null),
            (this.originPoint = { x: 0, y: 0 }),
            (this.constraints = !1),
            (this.hasMutatedConstraints = !1),
            (this.elastic = to()),
            (this.visualElement = e);
        }
        start(e, { snapToCursor: t = !1 } = {}) {
          let { presenceContext: n } = this.visualElement;
          if (n && !1 === n.isPresent) return;
          let { dragSnapToOrigin: r } = this.getProps();
          this.panSession = new eX(
            e,
            {
              onSessionStart: (e) => {
                let { dragSnapToOrigin: n } = this.getProps();
                n ? this.pauseAnimation() : this.stopAnimation(),
                  t && this.snapToCursor(ec(e, "page").point);
              },
              onStart: (e, t) => {
                let {
                  drag: n,
                  dragPropagation: r,
                  onDragStart: i,
                } = this.getProps();
                if (
                  n &&
                  !r &&
                  (this.openGlobalLock && this.openGlobalLock(),
                  (this.openGlobalLock = ey(n)),
                  !this.openGlobalLock)
                )
                  return;
                (this.isDragging = !0),
                  (this.currentDirection = null),
                  this.resolveConstraints(),
                  this.visualElement.projection &&
                    ((this.visualElement.projection.isAnimationBlocked = !0),
                    (this.visualElement.projection.target = void 0)),
                  ts((e) => {
                    let t = this.getAxisMotionValue(e).get() || 0;
                    if (z.aQ.test(t)) {
                      let { projection: n } = this.visualElement;
                      if (n && n.layout) {
                        let r = n.layout.layoutBox[e];
                        if (r) {
                          let e = e0(r);
                          t = (parseFloat(t) / 100) * e;
                        }
                      }
                    }
                    this.originPoint[e] = t;
                  }),
                  i && es.Wi.update(() => i(e, t), !1, !0);
                let { animationState: o } = this.visualElement;
                o && o.setActive("whileDrag", !0);
              },
              onMove: (e, t) => {
                let {
                  dragPropagation: n,
                  dragDirectionLock: r,
                  onDirectionLock: i,
                  onDrag: o,
                } = this.getProps();
                if (!n && !this.openGlobalLock) return;
                let { offset: s } = t;
                if (r && null === this.currentDirection) {
                  (this.currentDirection = (function (e, t = 10) {
                    let n = null;
                    return (
                      Math.abs(e.y) > t
                        ? (n = "y")
                        : Math.abs(e.x) > t && (n = "x"),
                      n
                    );
                  })(s)),
                    null !== this.currentDirection &&
                      i &&
                      i(this.currentDirection);
                  return;
                }
                this.updateAxis("x", t.point, s),
                  this.updateAxis("y", t.point, s),
                  this.visualElement.render(),
                  o && o(e, t);
              },
              onSessionEnd: (e, t) => this.stop(e, t),
              resumeAnimation: () =>
                ts((e) => {
                  var t;
                  return (
                    "paused" === this.getAnimationState(e) &&
                    (null === (t = this.getAxisMotionValue(e).animation) ||
                    void 0 === t
                      ? void 0
                      : t.play())
                  );
                }),
            },
            {
              transformPagePoint: this.visualElement.getTransformPagePoint(),
              dragSnapToOrigin: r,
              contextWindow: tA(this.visualElement),
            }
          );
        }
        stop(e, t) {
          let n = this.isDragging;
          if ((this.cancel(), !n)) return;
          let { velocity: r } = t;
          this.startAnimation(r);
          let { onDragEnd: i } = this.getProps();
          i && es.Wi.update(() => i(e, t));
        }
        cancel() {
          this.isDragging = !1;
          let { projection: e, animationState: t } = this.visualElement;
          e && (e.isAnimationBlocked = !1),
            this.panSession && this.panSession.end(),
            (this.panSession = void 0);
          let { dragPropagation: n } = this.getProps();
          !n &&
            this.openGlobalLock &&
            (this.openGlobalLock(), (this.openGlobalLock = null)),
            t && t.setActive("whileDrag", !1);
        }
        updateAxis(e, t, n) {
          let { drag: r } = this.getProps();
          if (!n || !tS(e, r, this.currentDirection)) return;
          let i = this.getAxisMotionValue(e),
            o = this.originPoint[e] + n[e];
          this.constraints &&
            this.constraints[e] &&
            (o = (function (e, { min: t, max: n }, r) {
              return (
                void 0 !== t && e < t
                  ? (e = r ? (0, eJ.C)(t, e, r.min) : Math.max(e, t))
                  : void 0 !== n &&
                    e > n &&
                    (e = r ? (0, eJ.C)(n, e, r.max) : Math.min(e, n)),
                e
              );
            })(o, this.constraints[e], this.elastic[e])),
            i.set(o);
        }
        resolveConstraints() {
          var e;
          let { dragConstraints: t, dragElastic: n } = this.getProps(),
            r =
              this.visualElement.projection &&
              !this.visualElement.projection.layout
                ? this.visualElement.projection.measure(!1)
                : null === (e = this.visualElement.projection) || void 0 === e
                ? void 0
                : e.layout,
            i = this.constraints;
          t && c(t)
            ? this.constraints ||
              (this.constraints = this.resolveRefConstraints())
            : t && r
            ? (this.constraints = (function (
                e,
                { top: t, left: n, bottom: r, right: i }
              ) {
                return { x: e7(e.x, n, i), y: e7(e.y, t, r) };
              })(r.layoutBox, t))
            : (this.constraints = !1),
            (this.elastic = (function (e = 0.35) {
              return (
                !1 === e ? (e = 0) : !0 === e && (e = 0.35),
                { x: te(e, "left", "right"), y: te(e, "top", "bottom") }
              );
            })(n)),
            i !== this.constraints &&
              r &&
              this.constraints &&
              !this.hasMutatedConstraints &&
              ts((e) => {
                this.getAxisMotionValue(e) &&
                  (this.constraints[e] = (function (e, t) {
                    let n = {};
                    return (
                      void 0 !== t.min && (n.min = t.min - e.min),
                      void 0 !== t.max && (n.max = t.max - e.min),
                      n
                    );
                  })(r.layoutBox[e], this.constraints[e]));
              });
        }
        resolveRefConstraints() {
          var e;
          let { dragConstraints: t, onMeasureDragConstraints: n } =
            this.getProps();
          if (!t || !c(t)) return !1;
          let r = t.current;
          (0, eU.k)(
            null !== r,
            "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop."
          );
          let { projection: i } = this.visualElement;
          if (!i || !i.layout) return !1;
          let o = (function (e, t, n) {
              let r = tx(e, n),
                { scroll: i } = t;
              return i && (tg(r.x, i.offset.x), tg(r.y, i.offset.y)), r;
            })(r, i.root, this.visualElement.getTransformPagePoint()),
            s = { x: e8((e = i.layout.layoutBox).x, o.x), y: e8(e.y, o.y) };
          if (n) {
            let e = n(
              (function ({ x: e, y: t }) {
                return { top: t.min, right: e.max, bottom: t.max, left: e.min };
              })(s)
            );
            (this.hasMutatedConstraints = !!e), e && (s = ta(e));
          }
          return s;
        }
        startAnimation(e) {
          let {
              drag: t,
              dragMomentum: n,
              dragElastic: r,
              dragTransition: i,
              dragSnapToOrigin: o,
              onDragTransitionEnd: s,
            } = this.getProps(),
            a = this.constraints || {};
          return Promise.all(
            ts((s) => {
              if (!tS(s, t, this.currentDirection)) return;
              let l = (a && a[s]) || {};
              o && (l = { min: 0, max: 0 });
              let u = {
                type: "inertia",
                velocity: n ? e[s] : 0,
                bounceStiffness: r ? 200 : 1e6,
                bounceDamping: r ? 40 : 1e7,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10,
                ...i,
                ...l,
              };
              return this.startAxisValueAnimation(s, u);
            })
          ).then(s);
        }
        startAxisValueAnimation(e, t) {
          let n = this.getAxisMotionValue(e);
          return n.start((0, tw.v)(e, n, 0, t));
        }
        stopAnimation() {
          ts((e) => this.getAxisMotionValue(e).stop());
        }
        pauseAnimation() {
          ts((e) => {
            var t;
            return null === (t = this.getAxisMotionValue(e).animation) ||
              void 0 === t
              ? void 0
              : t.pause();
          });
        }
        getAnimationState(e) {
          var t;
          return null === (t = this.getAxisMotionValue(e).animation) ||
            void 0 === t
            ? void 0
            : t.state;
        }
        getAxisMotionValue(e) {
          let t = "_drag" + e.toUpperCase(),
            n = this.visualElement.getProps();
          return (
            n[t] ||
            this.visualElement.getValue(
              e,
              (n.initial ? n.initial[e] : void 0) || 0
            )
          );
        }
        snapToCursor(e) {
          ts((t) => {
            let { drag: n } = this.getProps();
            if (!tS(t, n, this.currentDirection)) return;
            let { projection: r } = this.visualElement,
              i = this.getAxisMotionValue(t);
            if (r && r.layout) {
              let { min: n, max: o } = r.layout.layoutBox[t];
              i.set(e[t] - (0, eJ.C)(n, o, 0.5));
            }
          });
        }
        scalePositionWithinConstraints() {
          if (!this.visualElement.current) return;
          let { drag: e, dragConstraints: t } = this.getProps(),
            { projection: n } = this.visualElement;
          if (!c(t) || !n || !this.constraints) return;
          this.stopAnimation();
          let r = { x: 0, y: 0 };
          ts((e) => {
            let t = this.getAxisMotionValue(e);
            if (t) {
              let n = t.get();
              r[e] = (function (e, t) {
                let n = 0.5,
                  r = e0(e),
                  i = e0(t);
                return (
                  i > r
                    ? (n = (0, eK.Y)(t.min, t.max - r, e.min))
                    : r > i && (n = (0, eK.Y)(e.min, e.max - i, t.min)),
                  (0, e9.u)(0, 1, n)
                );
              })({ min: n, max: n }, this.constraints[e]);
            }
          });
          let { transformTemplate: i } = this.visualElement.getProps();
          (this.visualElement.current.style.transform = i ? i({}, "") : "none"),
            n.root && n.root.updateScroll(),
            n.updateLayout(),
            this.resolveConstraints(),
            ts((t) => {
              if (!tS(t, e, null)) return;
              let n = this.getAxisMotionValue(t),
                { min: i, max: o } = this.constraints[t];
              n.set((0, eJ.C)(i, o, r[t]));
            });
        }
        addListeners() {
          if (!this.visualElement.current) return;
          tP.set(this.visualElement, this);
          let e = ep(this.visualElement.current, "pointerdown", (e) => {
              let { drag: t, dragListener: n = !0 } = this.getProps();
              t && n && this.start(e);
            }),
            t = () => {
              let { dragConstraints: e } = this.getProps();
              c(e) && (this.constraints = this.resolveRefConstraints());
            },
            { projection: n } = this.visualElement,
            r = n.addEventListener("measure", t);
          n && !n.layout && (n.root && n.root.updateScroll(), n.updateLayout()),
            t();
          let i = eu(window, "resize", () =>
              this.scalePositionWithinConstraints()
            ),
            o = n.addEventListener(
              "didUpdate",
              ({ delta: e, hasLayoutChanged: t }) => {
                this.isDragging &&
                  t &&
                  (ts((t) => {
                    let n = this.getAxisMotionValue(t);
                    n &&
                      ((this.originPoint[t] += e[t].translate),
                      n.set(n.get() + e[t].translate));
                  }),
                  this.visualElement.render());
              }
            );
          return () => {
            i(), e(), r(), o && o();
          };
        }
        getProps() {
          let e = this.visualElement.getProps(),
            {
              drag: t = !1,
              dragDirectionLock: n = !1,
              dragPropagation: r = !1,
              dragConstraints: i = !1,
              dragElastic: o = 0.35,
              dragMomentum: s = !0,
            } = e;
          return {
            ...e,
            drag: t,
            dragDirectionLock: n,
            dragPropagation: r,
            dragConstraints: i,
            dragElastic: o,
            dragMomentum: s,
          };
        }
      }
      function tS(e, t, n) {
        return (!0 === t || t === e) && (null === n || n === e);
      }
      class tk extends eb {
        constructor(e) {
          super(e),
            (this.removeGroupControls = eT.Z),
            (this.removeListeners = eT.Z),
            (this.controls = new tT(e));
        }
        mount() {
          let { dragControls: e } = this.node.getProps();
          e && (this.removeGroupControls = e.subscribe(this.controls)),
            (this.removeListeners = this.controls.addListeners() || eT.Z);
        }
        unmount() {
          this.removeGroupControls(), this.removeListeners();
        }
      }
      let tC = (e) => (t, n) => {
        e && es.Wi.update(() => e(t, n));
      };
      class tE extends eb {
        constructor() {
          super(...arguments), (this.removePointerDownListener = eT.Z);
        }
        onPointerDown(e) {
          this.session = new eX(e, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: tA(this.node),
          });
        }
        createPanHandlers() {
          let {
            onPanSessionStart: e,
            onPanStart: t,
            onPan: n,
            onPanEnd: r,
          } = this.node.getProps();
          return {
            onSessionStart: tC(e),
            onStart: tC(t),
            onMove: n,
            onEnd: (e, t) => {
              delete this.session, r && es.Wi.update(() => r(e, t));
            },
          };
        }
        mount() {
          this.removePointerDownListener = ep(
            this.node.current,
            "pointerdown",
            (e) => this.onPointerDown(e)
          );
        }
        update() {
          this.session && this.session.updateHandlers(this.createPanHandlers());
        }
        unmount() {
          this.removePointerDownListener(), this.session && this.session.end();
        }
      }
      let tM = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
      function tO(e, t) {
        return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
      }
      let tV = {
        correct: (e, t) => {
          if (!t.target) return e;
          if ("string" == typeof e) {
            if (!z.px.test(e)) return e;
            e = parseFloat(e);
          }
          let n = tO(e, t.target.x),
            r = tO(e, t.target.y);
          return `${n}% ${r}%`;
        },
      };
      var tD = n(5636);
      class tj extends i.Component {
        componentDidMount() {
          let {
              visualElement: e,
              layoutGroup: t,
              switchLayoutGroup: n,
              layoutId: r,
            } = this.props,
            { projection: i } = e;
          Object.assign(k, tL),
            i &&
              (t.group && t.group.add(i),
              n && n.register && r && n.register(i),
              i.root.didUpdate(),
              i.addEventListener("animationComplete", () => {
                this.safeToRemove();
              }),
              i.setOptions({
                ...i.options,
                onExitComplete: () => this.safeToRemove(),
              })),
            (tM.hasEverUpdated = !0);
        }
        getSnapshotBeforeUpdate(e) {
          let {
              layoutDependency: t,
              visualElement: n,
              drag: r,
              isPresent: i,
            } = this.props,
            o = n.projection;
          return (
            o &&
              ((o.isPresent = i),
              r || e.layoutDependency !== t || void 0 === t
                ? o.willUpdate()
                : this.safeToRemove(),
              e.isPresent === i ||
                (i
                  ? o.promote()
                  : o.relegate() ||
                    es.Wi.postRender(() => {
                      let e = o.getStack();
                      (e && e.members.length) || this.safeToRemove();
                    }))),
            null
          );
        }
        componentDidUpdate() {
          let { projection: e } = this.props.visualElement;
          e &&
            (e.root.didUpdate(),
            queueMicrotask(() => {
              !e.currentAnimation && e.isLead() && this.safeToRemove();
            }));
        }
        componentWillUnmount() {
          let {
              visualElement: e,
              layoutGroup: t,
              switchLayoutGroup: n,
            } = this.props,
            { projection: r } = e;
          r &&
            (r.scheduleCheckAfterUnmount(),
            t && t.group && t.group.remove(r),
            n && n.deregister && n.deregister(r));
        }
        safeToRemove() {
          let { safeToRemove: e } = this.props;
          e && e();
        }
        render() {
          return null;
        }
      }
      function tR(e) {
        let [t, n] = (function () {
            let e = (0, i.useContext)(a);
            if (null === e) return [!0, null];
            let { isPresent: t, onExitComplete: n, register: r } = e,
              o = (0, i.useId)();
            return (
              (0, i.useEffect)(() => r(o), []),
              !t && n ? [!1, () => n && n(o)] : [!0]
            );
          })(),
          r = (0, i.useContext)(w);
        return i.createElement(tj, {
          ...e,
          layoutGroup: r,
          switchLayoutGroup: (0, i.useContext)(A),
          isPresent: t,
          safeToRemove: n,
        });
      }
      let tL = {
        borderRadius: {
          ...tV,
          applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius",
          ],
        },
        borderTopLeftRadius: tV,
        borderTopRightRadius: tV,
        borderBottomLeftRadius: tV,
        borderBottomRightRadius: tV,
        boxShadow: {
          correct: (e, { treeScale: t, projectionDelta: n }) => {
            let r = tD.P.parse(e);
            if (r.length > 5) return e;
            let i = tD.P.createTransformer(e),
              o = "number" != typeof r[0] ? 1 : 0,
              s = n.x.scale * t.x,
              a = n.y.scale * t.y;
            (r[0 + o] /= s), (r[1 + o] /= a);
            let l = (0, eJ.C)(s, a, 0.5);
            return (
              "number" == typeof r[2 + o] && (r[2 + o] /= l),
              "number" == typeof r[3 + o] && (r[3 + o] /= l),
              i(r)
            );
          },
        },
      };
      var tI = n(4081),
        tF = n(6378);
      let tB = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
        tN = tB.length,
        tH = (e) => ("string" == typeof e ? parseFloat(e) : e),
        tz = (e) => "number" == typeof e || z.px.test(e);
      function tW(e, t) {
        return void 0 !== e[t] ? e[t] : e.borderRadius;
      }
      let tU = tG(0, 0.5, tF.Bn),
        t$ = tG(0.5, 0.95, eT.Z);
      function tG(e, t, n) {
        return (r) => (r < e ? 0 : r > t ? 1 : n((0, eK.Y)(e, t, r)));
      }
      function tX(e, t) {
        (e.min = t.min), (e.max = t.max);
      }
      function tZ(e, t) {
        tX(e.x, t.x), tX(e.y, t.y);
      }
      function tq(e, t, n, r, i) {
        return (
          (e -= t),
          (e = r + (1 / n) * (e - r)),
          void 0 !== i && (e = r + (1 / i) * (e - r)),
          e
        );
      }
      function tY(e, t, [n, r, i], o, s) {
        !(function (e, t = 0, n = 1, r = 0.5, i, o = e, s = e) {
          if (
            (z.aQ.test(t) &&
              ((t = parseFloat(t)),
              (t = (0, eJ.C)(s.min, s.max, t / 100) - s.min)),
            "number" != typeof t)
          )
            return;
          let a = (0, eJ.C)(o.min, o.max, r);
          e === o && (a -= t),
            (e.min = tq(e.min, t, n, a, i)),
            (e.max = tq(e.max, t, n, a, i));
        })(e, t[n], t[r], t[i], t.scale, o, s);
      }
      let tQ = ["x", "scaleX", "originX"],
        tK = ["y", "scaleY", "originY"];
      function tJ(e, t, n, r) {
        tY(e.x, t, tQ, n ? n.x : void 0, r ? r.x : void 0),
          tY(e.y, t, tK, n ? n.y : void 0, r ? r.y : void 0);
      }
      var t0 = n(9573);
      function t1(e) {
        return 0 === e.translate && 1 === e.scale;
      }
      function t3(e) {
        return t1(e.x) && t1(e.y);
      }
      function t5(e, t) {
        return (
          Math.round(e.x.min) === Math.round(t.x.min) &&
          Math.round(e.x.max) === Math.round(t.x.max) &&
          Math.round(e.y.min) === Math.round(t.y.min) &&
          Math.round(e.y.max) === Math.round(t.y.max)
        );
      }
      function t2(e) {
        return e0(e.x) / e0(e.y);
      }
      var t4 = n(9013);
      class t6 {
        constructor() {
          this.members = [];
        }
        add(e) {
          (0, t4.y4)(this.members, e), e.scheduleRender();
        }
        remove(e) {
          if (
            ((0, t4.cl)(this.members, e),
            e === this.prevLead && (this.prevLead = void 0),
            e === this.lead)
          ) {
            let e = this.members[this.members.length - 1];
            e && this.promote(e);
          }
        }
        relegate(e) {
          let t;
          let n = this.members.findIndex((t) => e === t);
          if (0 === n) return !1;
          for (let e = n; e >= 0; e--) {
            let n = this.members[e];
            if (!1 !== n.isPresent) {
              t = n;
              break;
            }
          }
          return !!t && (this.promote(t), !0);
        }
        promote(e, t) {
          let n = this.lead;
          if (e !== n && ((this.prevLead = n), (this.lead = e), e.show(), n)) {
            n.instance && n.scheduleRender(),
              e.scheduleRender(),
              (e.resumeFrom = n),
              t && (e.resumeFrom.preserveOpacity = !0),
              n.snapshot &&
                ((e.snapshot = n.snapshot),
                (e.snapshot.latestValues =
                  n.animationValues || n.latestValues)),
              e.root && e.root.isUpdating && (e.isLayoutDirty = !0);
            let { crossfade: r } = e.options;
            !1 === r && n.hide();
          }
        }
        exitAnimationComplete() {
          this.members.forEach((e) => {
            let { options: t, resumingFrom: n } = e;
            t.onExitComplete && t.onExitComplete(),
              n && n.options.onExitComplete && n.options.onExitComplete();
          });
        }
        scheduleRender() {
          this.members.forEach((e) => {
            e.instance && e.scheduleRender(!1);
          });
        }
        removeLeadSnapshot() {
          this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
        }
      }
      function t9(e, t, n) {
        let r = "",
          i = e.x.translate / t.x,
          o = e.y.translate / t.y;
        if (
          ((i || o) && (r = `translate3d(${i}px, ${o}px, 0) `),
          (1 !== t.x || 1 !== t.y) && (r += `scale(${1 / t.x}, ${1 / t.y}) `),
          n)
        ) {
          let { rotate: e, rotateX: t, rotateY: i } = n;
          e && (r += `rotate(${e}deg) `),
            t && (r += `rotateX(${t}deg) `),
            i && (r += `rotateY(${i}deg) `);
        }
        let s = e.x.scale * t.x,
          a = e.y.scale * t.y;
        return (1 !== s || 1 !== a) && (r += `scale(${s}, ${a})`), r || "none";
      }
      let t7 = (e, t) => e.depth - t.depth;
      class t8 {
        constructor() {
          (this.children = []), (this.isDirty = !1);
        }
        add(e) {
          (0, t4.y4)(this.children, e), (this.isDirty = !0);
        }
        remove(e) {
          (0, t4.cl)(this.children, e), (this.isDirty = !0);
        }
        forEach(e) {
          this.isDirty && this.children.sort(t7),
            (this.isDirty = !1),
            this.children.forEach(e);
        }
      }
      var ne = n(3078);
      let nt = ["", "X", "Y", "Z"],
        nn = { visibility: "hidden" },
        nr = 0,
        ni = {
          type: "projectionFrame",
          totalNodes: 0,
          resolvedTargetDeltas: 0,
          recalculatedProjection: 0,
        };
      function no({
        attachResizeListener: e,
        defaultParent: t,
        measureScroll: n,
        checkIsScrollRoot: r,
        resetTransform: i,
      }) {
        return class {
          constructor(e = {}, n = null == t ? void 0 : t()) {
            (this.id = nr++),
              (this.animationId = 0),
              (this.children = new Set()),
              (this.options = {}),
              (this.isTreeAnimating = !1),
              (this.isAnimationBlocked = !1),
              (this.isLayoutDirty = !1),
              (this.isProjectionDirty = !1),
              (this.isSharedProjectionDirty = !1),
              (this.isTransformDirty = !1),
              (this.updateManuallyBlocked = !1),
              (this.updateBlockedByResize = !1),
              (this.isUpdating = !1),
              (this.isSVG = !1),
              (this.needsReset = !1),
              (this.shouldResetTransform = !1),
              (this.treeScale = { x: 1, y: 1 }),
              (this.eventHandlers = new Map()),
              (this.hasTreeAnimated = !1),
              (this.updateScheduled = !1),
              (this.projectionUpdateScheduled = !1),
              (this.checkUpdateFailed = () => {
                this.isUpdating &&
                  ((this.isUpdating = !1), this.clearAllSnapshots());
              }),
              (this.updateProjection = () => {
                (this.projectionUpdateScheduled = !1),
                  (ni.totalNodes =
                    ni.resolvedTargetDeltas =
                    ni.recalculatedProjection =
                      0),
                  this.nodes.forEach(nl),
                  this.nodes.forEach(nm),
                  this.nodes.forEach(ng),
                  this.nodes.forEach(nu),
                  window.MotionDebug && window.MotionDebug.record(ni);
              }),
              (this.hasProjected = !1),
              (this.isVisible = !0),
              (this.animationProgress = 0),
              (this.sharedNodes = new Map()),
              (this.latestValues = e),
              (this.root = n ? n.root || n : this),
              (this.path = n ? [...n.path, n] : []),
              (this.parent = n),
              (this.depth = n ? n.depth + 1 : 0);
            for (let e = 0; e < this.path.length; e++)
              this.path[e].shouldResetTransform = !0;
            this.root === this && (this.nodes = new t8());
          }
          addEventListener(e, t) {
            return (
              this.eventHandlers.has(e) ||
                this.eventHandlers.set(e, new tI.L()),
              this.eventHandlers.get(e).add(t)
            );
          }
          notifyListeners(e, ...t) {
            let n = this.eventHandlers.get(e);
            n && n.notify(...t);
          }
          hasListeners(e) {
            return this.eventHandlers.has(e);
          }
          mount(t, n = this.root.hasTreeAnimated) {
            if (this.instance) return;
            (this.isSVG = t instanceof SVGElement && "svg" !== t.tagName),
              (this.instance = t);
            let { layoutId: r, layout: i, visualElement: o } = this.options;
            if (
              (o && !o.current && o.mount(t),
              this.root.nodes.add(this),
              this.parent && this.parent.children.add(this),
              n && (i || r) && (this.isLayoutDirty = !0),
              e)
            ) {
              let n;
              let r = () => (this.root.updateBlockedByResize = !1);
              e(t, () => {
                (this.root.updateBlockedByResize = !0),
                  n && n(),
                  (n = (function (e, t) {
                    let n = performance.now(),
                      r = ({ timestamp: t }) => {
                        let i = t - n;
                        i >= 250 && ((0, es.Pn)(r), e(i - 250));
                      };
                    return es.Wi.read(r, !0), () => (0, es.Pn)(r);
                  })(r, 0)),
                  tM.hasAnimatedSinceResize &&
                    ((tM.hasAnimatedSinceResize = !1), this.nodes.forEach(nf));
              });
            }
            r && this.root.registerSharedNode(r, this),
              !1 !== this.options.animate &&
                o &&
                (r || i) &&
                this.addEventListener(
                  "didUpdate",
                  ({
                    delta: e,
                    hasLayoutChanged: t,
                    hasRelativeTargetChanged: n,
                    layout: r,
                  }) => {
                    if (this.isTreeAnimationBlocked()) {
                      (this.target = void 0), (this.relativeTarget = void 0);
                      return;
                    }
                    let i =
                        this.options.transition ||
                        o.getDefaultTransition() ||
                        nw,
                      {
                        onLayoutAnimationStart: s,
                        onLayoutAnimationComplete: a,
                      } = o.getProps(),
                      l = !this.targetLayout || !t5(this.targetLayout, r) || n,
                      u = !t && n;
                    if (
                      this.options.layoutRoot ||
                      (this.resumeFrom && this.resumeFrom.instance) ||
                      u ||
                      (t && (l || !this.currentAnimation))
                    ) {
                      this.resumeFrom &&
                        ((this.resumingFrom = this.resumeFrom),
                        (this.resumingFrom.resumingFrom = void 0)),
                        this.setAnimationOrigin(e, u);
                      let t = {
                        ...(0, t0.e)(i, "layout"),
                        onPlay: s,
                        onComplete: a,
                      };
                      (o.shouldReduceMotion || this.options.layoutRoot) &&
                        ((t.delay = 0), (t.type = !1)),
                        this.startAnimation(t);
                    } else
                      t || nf(this),
                        this.isLead() &&
                          this.options.onExitComplete &&
                          this.options.onExitComplete();
                    this.targetLayout = r;
                  }
                );
          }
          unmount() {
            this.options.layoutId && this.willUpdate(),
              this.root.nodes.remove(this);
            let e = this.getStack();
            e && e.remove(this),
              this.parent && this.parent.children.delete(this),
              (this.instance = void 0),
              (0, es.Pn)(this.updateProjection);
          }
          blockUpdate() {
            this.updateManuallyBlocked = !0;
          }
          unblockUpdate() {
            this.updateManuallyBlocked = !1;
          }
          isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize;
          }
          isTreeAnimationBlocked() {
            return (
              this.isAnimationBlocked ||
              (this.parent && this.parent.isTreeAnimationBlocked()) ||
              !1
            );
          }
          startUpdate() {
            !this.isUpdateBlocked() &&
              ((this.isUpdating = !0),
              this.nodes && this.nodes.forEach(nv),
              this.animationId++);
          }
          getTransformTemplate() {
            let { visualElement: e } = this.options;
            return e && e.getProps().transformTemplate;
          }
          willUpdate(e = !0) {
            if (
              ((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())
            ) {
              this.options.onExitComplete && this.options.onExitComplete();
              return;
            }
            if (
              (this.root.isUpdating || this.root.startUpdate(),
              this.isLayoutDirty)
            )
              return;
            this.isLayoutDirty = !0;
            for (let e = 0; e < this.path.length; e++) {
              let t = this.path[e];
              (t.shouldResetTransform = !0),
                t.updateScroll("snapshot"),
                t.options.layoutRoot && t.willUpdate(!1);
            }
            let { layoutId: t, layout: n } = this.options;
            if (void 0 === t && !n) return;
            let r = this.getTransformTemplate();
            (this.prevTransformTemplateValue = r
              ? r(this.latestValues, "")
              : void 0),
              this.updateSnapshot(),
              e && this.notifyListeners("willUpdate");
          }
          update() {
            if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
              this.unblockUpdate(),
                this.clearAllSnapshots(),
                this.nodes.forEach(nc);
              return;
            }
            this.isUpdating || this.nodes.forEach(nh),
              (this.isUpdating = !1),
              this.nodes.forEach(np),
              this.nodes.forEach(ns),
              this.nodes.forEach(na),
              this.clearAllSnapshots();
            let e = performance.now();
            (es.frameData.delta = (0, e9.u)(
              0,
              1e3 / 60,
              e - es.frameData.timestamp
            )),
              (es.frameData.timestamp = e),
              (es.frameData.isProcessing = !0),
              es.S6.update.process(es.frameData),
              es.S6.preRender.process(es.frameData),
              es.S6.render.process(es.frameData),
              (es.frameData.isProcessing = !1);
          }
          didUpdate() {
            this.updateScheduled ||
              ((this.updateScheduled = !0),
              queueMicrotask(() => this.update()));
          }
          clearAllSnapshots() {
            this.nodes.forEach(nd), this.sharedNodes.forEach(ny);
          }
          scheduleUpdateProjection() {
            this.projectionUpdateScheduled ||
              ((this.projectionUpdateScheduled = !0),
              es.Wi.preRender(this.updateProjection, !1, !0));
          }
          scheduleCheckAfterUnmount() {
            es.Wi.postRender(() => {
              this.isLayoutDirty
                ? this.root.didUpdate()
                : this.root.checkUpdateFailed();
            });
          }
          updateSnapshot() {
            !this.snapshot && this.instance && (this.snapshot = this.measure());
          }
          updateLayout() {
            if (
              !this.instance ||
              (this.updateScroll(),
              !(this.options.alwaysMeasureLayout && this.isLead()) &&
                !this.isLayoutDirty)
            )
              return;
            if (this.resumeFrom && !this.resumeFrom.instance)
              for (let e = 0; e < this.path.length; e++)
                this.path[e].updateScroll();
            let e = this.layout;
            (this.layout = this.measure(!1)),
              (this.layoutCorrected = to()),
              (this.isLayoutDirty = !1),
              (this.projectionDelta = void 0),
              this.notifyListeners("measure", this.layout.layoutBox);
            let { visualElement: t } = this.options;
            t &&
              t.notify(
                "LayoutMeasure",
                this.layout.layoutBox,
                e ? e.layoutBox : void 0
              );
          }
          updateScroll(e = "measure") {
            let t = !!(this.options.layoutScroll && this.instance);
            this.scroll &&
              this.scroll.animationId === this.root.animationId &&
              this.scroll.phase === e &&
              (t = !1),
              t &&
                (this.scroll = {
                  animationId: this.root.animationId,
                  phase: e,
                  isRoot: r(this.instance),
                  offset: n(this.instance),
                });
          }
          resetTransform() {
            if (!i) return;
            let e = this.isLayoutDirty || this.shouldResetTransform,
              t = this.projectionDelta && !t3(this.projectionDelta),
              n = this.getTransformTemplate(),
              r = n ? n(this.latestValues, "") : void 0,
              o = r !== this.prevTransformTemplateValue;
            e &&
              (t || td(this.latestValues) || o) &&
              (i(this.instance, r),
              (this.shouldResetTransform = !1),
              this.scheduleRender());
          }
          measure(e = !0) {
            var t;
            let n = this.measurePageBox(),
              r = this.removeElementScroll(n);
            return (
              e && (r = this.removeTransform(r)),
              nT((t = r).x),
              nT(t.y),
              {
                animationId: this.root.animationId,
                measuredBox: n,
                layoutBox: r,
                latestValues: {},
                source: this.id,
              }
            );
          }
          measurePageBox() {
            let { visualElement: e } = this.options;
            if (!e) return to();
            let t = e.measureViewportBox(),
              { scroll: n } = this.root;
            return n && (tg(t.x, n.offset.x), tg(t.y, n.offset.y)), t;
          }
          removeElementScroll(e) {
            let t = to();
            tZ(t, e);
            for (let n = 0; n < this.path.length; n++) {
              let r = this.path[n],
                { scroll: i, options: o } = r;
              if (r !== this.root && i && o.layoutScroll) {
                if (i.isRoot) {
                  tZ(t, e);
                  let { scroll: n } = this.root;
                  n && (tg(t.x, -n.offset.x), tg(t.y, -n.offset.y));
                }
                tg(t.x, i.offset.x), tg(t.y, i.offset.y);
              }
            }
            return t;
          }
          applyTransform(e, t = !1) {
            let n = to();
            tZ(n, e);
            for (let e = 0; e < this.path.length; e++) {
              let r = this.path[e];
              !t &&
                r.options.layoutScroll &&
                r.scroll &&
                r !== r.root &&
                tb(n, { x: -r.scroll.offset.x, y: -r.scroll.offset.y }),
                td(r.latestValues) && tb(n, r.latestValues);
            }
            return td(this.latestValues) && tb(n, this.latestValues), n;
          }
          removeTransform(e) {
            let t = to();
            tZ(t, e);
            for (let e = 0; e < this.path.length; e++) {
              let n = this.path[e];
              if (!n.instance || !td(n.latestValues)) continue;
              tu(n.latestValues) && n.updateSnapshot();
              let r = to();
              tZ(r, n.measurePageBox()),
                tJ(
                  t,
                  n.latestValues,
                  n.snapshot ? n.snapshot.layoutBox : void 0,
                  r
                );
            }
            return td(this.latestValues) && tJ(t, this.latestValues), t;
          }
          setTargetDelta(e) {
            (this.targetDelta = e),
              this.root.scheduleUpdateProjection(),
              (this.isProjectionDirty = !0);
          }
          setOptions(e) {
            this.options = {
              ...this.options,
              ...e,
              crossfade: void 0 === e.crossfade || e.crossfade,
            };
          }
          clearMeasurements() {
            (this.scroll = void 0),
              (this.layout = void 0),
              (this.snapshot = void 0),
              (this.prevTransformTemplateValue = void 0),
              (this.targetDelta = void 0),
              (this.target = void 0),
              (this.isLayoutDirty = !1);
          }
          forceRelativeParentToResolveTarget() {
            this.relativeParent &&
              this.relativeParent.resolvedRelativeTargetAt !==
                es.frameData.timestamp &&
              this.relativeParent.resolveTargetDelta(!0);
          }
          resolveTargetDelta(e = !1) {
            var t, n, r, i;
            let o = this.getLead();
            this.isProjectionDirty ||
              (this.isProjectionDirty = o.isProjectionDirty),
              this.isTransformDirty ||
                (this.isTransformDirty = o.isTransformDirty),
              this.isSharedProjectionDirty ||
                (this.isSharedProjectionDirty = o.isSharedProjectionDirty);
            let s = !!this.resumingFrom || this !== o;
            if (
              !(
                e ||
                (s && this.isSharedProjectionDirty) ||
                this.isProjectionDirty ||
                (null === (t = this.parent) || void 0 === t
                  ? void 0
                  : t.isProjectionDirty) ||
                this.attemptToResolveRelativeTarget
              )
            )
              return;
            let { layout: a, layoutId: l } = this.options;
            if (this.layout && (a || l)) {
              if (
                ((this.resolvedRelativeTargetAt = es.frameData.timestamp),
                !this.targetDelta && !this.relativeTarget)
              ) {
                let e = this.getClosestProjectingParent();
                e && e.layout && 1 !== this.animationProgress
                  ? ((this.relativeParent = e),
                    this.forceRelativeParentToResolveTarget(),
                    (this.relativeTarget = to()),
                    (this.relativeTargetOrigin = to()),
                    e6(
                      this.relativeTargetOrigin,
                      this.layout.layoutBox,
                      e.layout.layoutBox
                    ),
                    tZ(this.relativeTarget, this.relativeTargetOrigin))
                  : (this.relativeParent = this.relativeTarget = void 0);
              }
              if (this.relativeTarget || this.targetDelta) {
                if (
                  ((this.target ||
                    ((this.target = to()), (this.targetWithTransforms = to())),
                  this.relativeTarget &&
                    this.relativeTargetOrigin &&
                    this.relativeParent &&
                    this.relativeParent.target)
                    ? (this.forceRelativeParentToResolveTarget(),
                      (n = this.target),
                      (r = this.relativeTarget),
                      (i = this.relativeParent.target),
                      e2(n.x, r.x, i.x),
                      e2(n.y, r.y, i.y))
                    : this.targetDelta
                    ? (this.resumingFrom
                        ? (this.target = this.applyTransform(
                            this.layout.layoutBox
                          ))
                        : tZ(this.target, this.layout.layoutBox),
                      tf(this.target, this.targetDelta))
                    : tZ(this.target, this.layout.layoutBox),
                  this.attemptToResolveRelativeTarget)
                ) {
                  this.attemptToResolveRelativeTarget = !1;
                  let e = this.getClosestProjectingParent();
                  e &&
                  !!e.resumingFrom == !!this.resumingFrom &&
                  !e.options.layoutScroll &&
                  e.target &&
                  1 !== this.animationProgress
                    ? ((this.relativeParent = e),
                      this.forceRelativeParentToResolveTarget(),
                      (this.relativeTarget = to()),
                      (this.relativeTargetOrigin = to()),
                      e6(this.relativeTargetOrigin, this.target, e.target),
                      tZ(this.relativeTarget, this.relativeTargetOrigin))
                    : (this.relativeParent = this.relativeTarget = void 0);
                }
                ni.resolvedTargetDeltas++;
              }
            }
          }
          getClosestProjectingParent() {
            return !this.parent ||
              tu(this.parent.latestValues) ||
              tc(this.parent.latestValues)
              ? void 0
              : this.parent.isProjecting()
              ? this.parent
              : this.parent.getClosestProjectingParent();
          }
          isProjecting() {
            return !!(
              (this.relativeTarget ||
                this.targetDelta ||
                this.options.layoutRoot) &&
              this.layout
            );
          }
          calcProjection() {
            var e;
            let t = this.getLead(),
              n = !!this.resumingFrom || this !== t,
              r = !0;
            if (
              ((this.isProjectionDirty ||
                (null === (e = this.parent) || void 0 === e
                  ? void 0
                  : e.isProjectionDirty)) &&
                (r = !1),
              n &&
                (this.isSharedProjectionDirty || this.isTransformDirty) &&
                (r = !1),
              this.resolvedRelativeTargetAt === es.frameData.timestamp &&
                (r = !1),
              r)
            )
              return;
            let { layout: i, layoutId: o } = this.options;
            if (
              ((this.isTreeAnimating = !!(
                (this.parent && this.parent.isTreeAnimating) ||
                this.currentAnimation ||
                this.pendingAnimation
              )),
              this.isTreeAnimating ||
                (this.targetDelta = this.relativeTarget = void 0),
              !this.layout || !(i || o))
            )
              return;
            tZ(this.layoutCorrected, this.layout.layoutBox);
            let s = this.treeScale.x,
              a = this.treeScale.y;
            !(function (e, t, n, r = !1) {
              let i, o;
              let s = n.length;
              if (s) {
                t.x = t.y = 1;
                for (let a = 0; a < s; a++) {
                  o = (i = n[a]).projectionDelta;
                  let s = i.instance;
                  (!s || !s.style || "contents" !== s.style.display) &&
                    (r &&
                      i.options.layoutScroll &&
                      i.scroll &&
                      i !== i.root &&
                      tb(e, { x: -i.scroll.offset.x, y: -i.scroll.offset.y }),
                    o && ((t.x *= o.x.scale), (t.y *= o.y.scale), tf(e, o)),
                    r && td(i.latestValues) && tb(e, i.latestValues));
                }
                (t.x = tm(t.x)), (t.y = tm(t.y));
              }
            })(this.layoutCorrected, this.treeScale, this.path, n),
              t.layout &&
                !t.target &&
                (1 !== this.treeScale.x || 1 !== this.treeScale.y) &&
                (t.target = t.layout.layoutBox);
            let { target: l } = t;
            if (!l) {
              this.projectionTransform &&
                ((this.projectionDelta = tr()),
                (this.projectionTransform = "none"),
                this.scheduleRender());
              return;
            }
            this.projectionDelta ||
              ((this.projectionDelta = tr()),
              (this.projectionDeltaWithTransform = tr()));
            let u = this.projectionTransform;
            e5(
              this.projectionDelta,
              this.layoutCorrected,
              l,
              this.latestValues
            ),
              (this.projectionTransform = t9(
                this.projectionDelta,
                this.treeScale
              )),
              (this.projectionTransform !== u ||
                this.treeScale.x !== s ||
                this.treeScale.y !== a) &&
                ((this.hasProjected = !0),
                this.scheduleRender(),
                this.notifyListeners("projectionUpdate", l)),
              ni.recalculatedProjection++;
          }
          hide() {
            this.isVisible = !1;
          }
          show() {
            this.isVisible = !0;
          }
          scheduleRender(e = !0) {
            if (
              (this.options.scheduleRender && this.options.scheduleRender(), e)
            ) {
              let e = this.getStack();
              e && e.scheduleRender();
            }
            this.resumingFrom &&
              !this.resumingFrom.instance &&
              (this.resumingFrom = void 0);
          }
          setAnimationOrigin(e, t = !1) {
            let n;
            let r = this.snapshot,
              i = r ? r.latestValues : {},
              o = { ...this.latestValues },
              s = tr();
            (this.relativeParent && this.relativeParent.options.layoutRoot) ||
              (this.relativeTarget = this.relativeTargetOrigin = void 0),
              (this.attemptToResolveRelativeTarget = !t);
            let a = to(),
              l =
                (r ? r.source : void 0) !==
                (this.layout ? this.layout.source : void 0),
              u = this.getStack(),
              d = !u || u.members.length <= 1,
              c = !!(
                l &&
                !d &&
                !0 === this.options.crossfade &&
                !this.path.some(nx)
              );
            (this.animationProgress = 0),
              (this.mixTargetDelta = (t) => {
                let r = t / 1e3;
                if (
                  (n_(s.x, e.x, r),
                  n_(s.y, e.y, r),
                  this.setTargetDelta(s),
                  this.relativeTarget &&
                    this.relativeTargetOrigin &&
                    this.layout &&
                    this.relativeParent &&
                    this.relativeParent.layout)
                ) {
                  var u, h, p, f;
                  e6(
                    a,
                    this.layout.layoutBox,
                    this.relativeParent.layout.layoutBox
                  ),
                    (p = this.relativeTarget),
                    (f = this.relativeTargetOrigin),
                    nb(p.x, f.x, a.x, r),
                    nb(p.y, f.y, a.y, r),
                    n &&
                      ((u = this.relativeTarget),
                      (h = n),
                      u.x.min === h.x.min &&
                        u.x.max === h.x.max &&
                        u.y.min === h.y.min &&
                        u.y.max === h.y.max) &&
                      (this.isProjectionDirty = !1),
                    n || (n = to()),
                    tZ(n, this.relativeTarget);
                }
                l &&
                  ((this.animationValues = o),
                  (function (e, t, n, r, i, o) {
                    i
                      ? ((e.opacity = (0, eJ.C)(
                          0,
                          void 0 !== n.opacity ? n.opacity : 1,
                          tU(r)
                        )),
                        (e.opacityExit = (0, eJ.C)(
                          void 0 !== t.opacity ? t.opacity : 1,
                          0,
                          t$(r)
                        )))
                      : o &&
                        (e.opacity = (0, eJ.C)(
                          void 0 !== t.opacity ? t.opacity : 1,
                          void 0 !== n.opacity ? n.opacity : 1,
                          r
                        ));
                    for (let i = 0; i < tN; i++) {
                      let o = `border${tB[i]}Radius`,
                        s = tW(t, o),
                        a = tW(n, o);
                      (void 0 !== s || void 0 !== a) &&
                        (s || (s = 0),
                        a || (a = 0),
                        0 === s || 0 === a || tz(s) === tz(a)
                          ? ((e[o] = Math.max((0, eJ.C)(tH(s), tH(a), r), 0)),
                            (z.aQ.test(a) || z.aQ.test(s)) && (e[o] += "%"))
                          : (e[o] = a));
                    }
                    (t.rotate || n.rotate) &&
                      (e.rotate = (0, eJ.C)(t.rotate || 0, n.rotate || 0, r));
                  })(o, i, this.latestValues, r, c, d)),
                  this.root.scheduleUpdateProjection(),
                  this.scheduleRender(),
                  (this.animationProgress = r);
              }),
              this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
          }
          startAnimation(e) {
            this.notifyListeners("animationStart"),
              this.currentAnimation && this.currentAnimation.stop(),
              this.resumingFrom &&
                this.resumingFrom.currentAnimation &&
                this.resumingFrom.currentAnimation.stop(),
              this.pendingAnimation &&
                ((0, es.Pn)(this.pendingAnimation),
                (this.pendingAnimation = void 0)),
              (this.pendingAnimation = es.Wi.update(() => {
                (tM.hasAnimatedSinceResize = !0),
                  (this.currentAnimation = (function (e, t, n) {
                    let r = (0, M.i)(0) ? 0 : (0, ne.BX)(0);
                    return r.start((0, tw.v)("", r, 1e3, n)), r.animation;
                  })(0, 0, {
                    ...e,
                    onUpdate: (t) => {
                      this.mixTargetDelta(t), e.onUpdate && e.onUpdate(t);
                    },
                    onComplete: () => {
                      e.onComplete && e.onComplete(), this.completeAnimation();
                    },
                  })),
                  this.resumingFrom &&
                    (this.resumingFrom.currentAnimation =
                      this.currentAnimation),
                  (this.pendingAnimation = void 0);
              }));
          }
          completeAnimation() {
            this.resumingFrom &&
              ((this.resumingFrom.currentAnimation = void 0),
              (this.resumingFrom.preserveOpacity = void 0));
            let e = this.getStack();
            e && e.exitAnimationComplete(),
              (this.resumingFrom =
                this.currentAnimation =
                this.animationValues =
                  void 0),
              this.notifyListeners("animationComplete");
          }
          finishAnimation() {
            this.currentAnimation &&
              (this.mixTargetDelta && this.mixTargetDelta(1e3),
              this.currentAnimation.stop()),
              this.completeAnimation();
          }
          applyTransformsToTarget() {
            let e = this.getLead(),
              {
                targetWithTransforms: t,
                target: n,
                layout: r,
                latestValues: i,
              } = e;
            if (t && n && r) {
              if (
                this !== e &&
                this.layout &&
                r &&
                nS(
                  this.options.animationType,
                  this.layout.layoutBox,
                  r.layoutBox
                )
              ) {
                n = this.target || to();
                let t = e0(this.layout.layoutBox.x);
                (n.x.min = e.target.x.min), (n.x.max = n.x.min + t);
                let r = e0(this.layout.layoutBox.y);
                (n.y.min = e.target.y.min), (n.y.max = n.y.min + r);
              }
              tZ(t, n),
                tb(t, i),
                e5(
                  this.projectionDeltaWithTransform,
                  this.layoutCorrected,
                  t,
                  i
                );
            }
          }
          registerSharedNode(e, t) {
            this.sharedNodes.has(e) || this.sharedNodes.set(e, new t6()),
              this.sharedNodes.get(e).add(t);
            let n = t.options.initialPromotionConfig;
            t.promote({
              transition: n ? n.transition : void 0,
              preserveFollowOpacity:
                n && n.shouldPreserveFollowOpacity
                  ? n.shouldPreserveFollowOpacity(t)
                  : void 0,
            });
          }
          isLead() {
            let e = this.getStack();
            return !e || e.lead === this;
          }
          getLead() {
            var e;
            let { layoutId: t } = this.options;
            return (
              (t &&
                (null === (e = this.getStack()) || void 0 === e
                  ? void 0
                  : e.lead)) ||
              this
            );
          }
          getPrevLead() {
            var e;
            let { layoutId: t } = this.options;
            return t
              ? null === (e = this.getStack()) || void 0 === e
                ? void 0
                : e.prevLead
              : void 0;
          }
          getStack() {
            let { layoutId: e } = this.options;
            if (e) return this.root.sharedNodes.get(e);
          }
          promote({
            needsReset: e,
            transition: t,
            preserveFollowOpacity: n,
          } = {}) {
            let r = this.getStack();
            r && r.promote(this, n),
              e && ((this.projectionDelta = void 0), (this.needsReset = !0)),
              t && this.setOptions({ transition: t });
          }
          relegate() {
            let e = this.getStack();
            return !!e && e.relegate(this);
          }
          resetRotation() {
            let { visualElement: e } = this.options;
            if (!e) return;
            let t = !1,
              { latestValues: n } = e;
            if (
              ((n.rotate || n.rotateX || n.rotateY || n.rotateZ) && (t = !0),
              !t)
            )
              return;
            let r = {};
            for (let t = 0; t < nt.length; t++) {
              let i = "rotate" + nt[t];
              n[i] && ((r[i] = n[i]), e.setStaticValue(i, 0));
            }
            for (let t in (e.render(), r)) e.setStaticValue(t, r[t]);
            e.scheduleRender();
          }
          getProjectionStyles(e) {
            var t, n;
            if (!this.instance || this.isSVG) return;
            if (!this.isVisible) return nn;
            let r = { visibility: "" },
              i = this.getTransformTemplate();
            if (this.needsReset)
              return (
                (this.needsReset = !1),
                (r.opacity = ""),
                (r.pointerEvents =
                  ei(null == e ? void 0 : e.pointerEvents) || ""),
                (r.transform = i ? i(this.latestValues, "") : "none"),
                r
              );
            let o = this.getLead();
            if (!this.projectionDelta || !this.layout || !o.target) {
              let t = {};
              return (
                this.options.layoutId &&
                  ((t.opacity =
                    void 0 !== this.latestValues.opacity
                      ? this.latestValues.opacity
                      : 1),
                  (t.pointerEvents =
                    ei(null == e ? void 0 : e.pointerEvents) || "")),
                this.hasProjected &&
                  !td(this.latestValues) &&
                  ((t.transform = i ? i({}, "") : "none"),
                  (this.hasProjected = !1)),
                t
              );
            }
            let s = o.animationValues || o.latestValues;
            this.applyTransformsToTarget(),
              (r.transform = t9(
                this.projectionDeltaWithTransform,
                this.treeScale,
                s
              )),
              i && (r.transform = i(s, r.transform));
            let { x: a, y: l } = this.projectionDelta;
            for (let e in ((r.transformOrigin = `${100 * a.origin}% ${
              100 * l.origin
            }% 0`),
            o.animationValues
              ? (r.opacity =
                  o === this
                    ? null !==
                        (n =
                          null !== (t = s.opacity) && void 0 !== t
                            ? t
                            : this.latestValues.opacity) && void 0 !== n
                      ? n
                      : 1
                    : this.preserveOpacity
                    ? this.latestValues.opacity
                    : s.opacityExit)
              : (r.opacity =
                  o === this
                    ? void 0 !== s.opacity
                      ? s.opacity
                      : ""
                    : void 0 !== s.opacityExit
                    ? s.opacityExit
                    : 0),
            k)) {
              if (void 0 === s[e]) continue;
              let { correct: t, applyTo: n } = k[e],
                i = "none" === r.transform ? s[e] : t(s[e], o);
              if (n) {
                let e = n.length;
                for (let t = 0; t < e; t++) r[n[t]] = i;
              } else r[e] = i;
            }
            return (
              this.options.layoutId &&
                (r.pointerEvents =
                  o === this
                    ? ei(null == e ? void 0 : e.pointerEvents) || ""
                    : "none"),
              r
            );
          }
          clearSnapshot() {
            this.resumeFrom = this.snapshot = void 0;
          }
          resetTree() {
            this.root.nodes.forEach((e) => {
              var t;
              return null === (t = e.currentAnimation) || void 0 === t
                ? void 0
                : t.stop();
            }),
              this.root.nodes.forEach(nc),
              this.root.sharedNodes.clear();
          }
        };
      }
      function ns(e) {
        e.updateLayout();
      }
      function na(e) {
        var t;
        let n =
          (null === (t = e.resumeFrom) || void 0 === t ? void 0 : t.snapshot) ||
          e.snapshot;
        if (e.isLead() && e.layout && n && e.hasListeners("didUpdate")) {
          let { layoutBox: t, measuredBox: r } = e.layout,
            { animationType: i } = e.options,
            o = n.source !== e.layout.source;
          "size" === i
            ? ts((e) => {
                let r = o ? n.measuredBox[e] : n.layoutBox[e],
                  i = e0(r);
                (r.min = t[e].min), (r.max = r.min + i);
              })
            : nS(i, n.layoutBox, t) &&
              ts((r) => {
                let i = o ? n.measuredBox[r] : n.layoutBox[r],
                  s = e0(t[r]);
                (i.max = i.min + s),
                  e.relativeTarget &&
                    !e.currentAnimation &&
                    ((e.isProjectionDirty = !0),
                    (e.relativeTarget[r].max = e.relativeTarget[r].min + s));
              });
          let s = tr();
          e5(s, t, n.layoutBox);
          let a = tr();
          o
            ? e5(a, e.applyTransform(r, !0), n.measuredBox)
            : e5(a, t, n.layoutBox);
          let l = !t3(s),
            u = !1;
          if (!e.resumeFrom) {
            let r = e.getClosestProjectingParent();
            if (r && !r.resumeFrom) {
              let { snapshot: i, layout: o } = r;
              if (i && o) {
                let s = to();
                e6(s, n.layoutBox, i.layoutBox);
                let a = to();
                e6(a, t, o.layoutBox),
                  t5(s, a) || (u = !0),
                  r.options.layoutRoot &&
                    ((e.relativeTarget = a),
                    (e.relativeTargetOrigin = s),
                    (e.relativeParent = r));
              }
            }
          }
          e.notifyListeners("didUpdate", {
            layout: t,
            snapshot: n,
            delta: a,
            layoutDelta: s,
            hasLayoutChanged: l,
            hasRelativeTargetChanged: u,
          });
        } else if (e.isLead()) {
          let { onExitComplete: t } = e.options;
          t && t();
        }
        e.options.transition = void 0;
      }
      function nl(e) {
        ni.totalNodes++,
          e.parent &&
            (e.isProjecting() ||
              (e.isProjectionDirty = e.parent.isProjectionDirty),
            e.isSharedProjectionDirty ||
              (e.isSharedProjectionDirty = !!(
                e.isProjectionDirty ||
                e.parent.isProjectionDirty ||
                e.parent.isSharedProjectionDirty
              )),
            e.isTransformDirty ||
              (e.isTransformDirty = e.parent.isTransformDirty));
      }
      function nu(e) {
        e.isProjectionDirty =
          e.isSharedProjectionDirty =
          e.isTransformDirty =
            !1;
      }
      function nd(e) {
        e.clearSnapshot();
      }
      function nc(e) {
        e.clearMeasurements();
      }
      function nh(e) {
        e.isLayoutDirty = !1;
      }
      function np(e) {
        let { visualElement: t } = e.options;
        t &&
          t.getProps().onBeforeLayoutMeasure &&
          t.notify("BeforeLayoutMeasure"),
          e.resetTransform();
      }
      function nf(e) {
        e.finishAnimation(),
          (e.targetDelta = e.relativeTarget = e.target = void 0),
          (e.isProjectionDirty = !0);
      }
      function nm(e) {
        e.resolveTargetDelta();
      }
      function ng(e) {
        e.calcProjection();
      }
      function nv(e) {
        e.resetRotation();
      }
      function ny(e) {
        e.removeLeadSnapshot();
      }
      function n_(e, t, n) {
        (e.translate = (0, eJ.C)(t.translate, 0, n)),
          (e.scale = (0, eJ.C)(t.scale, 1, n)),
          (e.origin = t.origin),
          (e.originPoint = t.originPoint);
      }
      function nb(e, t, n, r) {
        (e.min = (0, eJ.C)(t.min, n.min, r)),
          (e.max = (0, eJ.C)(t.max, n.max, r));
      }
      function nx(e) {
        return e.animationValues && void 0 !== e.animationValues.opacityExit;
      }
      let nw = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
        nA = (e) =>
          "undefined" != typeof navigator &&
          navigator.userAgent.toLowerCase().includes(e),
        nP = nA("applewebkit/") && !nA("chrome/") ? Math.round : eT.Z;
      function nT(e) {
        (e.min = nP(e.min)), (e.max = nP(e.max));
      }
      function nS(e, t, n) {
        return (
          "position" === e ||
          ("preserve-aspect" === e && !e1(t2(t), t2(n), 0.2))
        );
      }
      let nk = no({
          attachResizeListener: (e, t) => eu(e, "resize", t),
          measureScroll: () => ({
            x: document.documentElement.scrollLeft || document.body.scrollLeft,
            y: document.documentElement.scrollTop || document.body.scrollTop,
          }),
          checkIsScrollRoot: () => !0,
        }),
        nC = { current: void 0 },
        nE = no({
          measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
          defaultParent: () => {
            if (!nC.current) {
              let e = new nk({});
              e.mount(window),
                e.setOptions({ layoutScroll: !0 }),
                (nC.current = e);
            }
            return nC.current;
          },
          resetTransform: (e, t) => {
            e.style.transform = void 0 !== t ? t : "none";
          },
          checkIsScrollRoot: (e) =>
            "fixed" === window.getComputedStyle(e).position,
        });
      var nM = n(2005),
        nO = n(6179),
        nV = n(4946);
      let nD = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
      function nj(e, t, n = 1) {
        (0, eU.k)(
          n <= 4,
          `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`
        );
        let [r, i] = (function (e) {
          let t = nD.exec(e);
          if (!t) return [,];
          let [, n, r] = t;
          return [n, r];
        })(e);
        if (!r) return;
        let o = window.getComputedStyle(t).getPropertyValue(r);
        if (o) {
          let e = o.trim();
          return (0, nV.P)(e) ? parseFloat(e) : e;
        }
        return (0, D.tm)(i) ? nj(i, t, n + 1) : i;
      }
      var nR = n(8580),
        nL = n(4305);
      let nI = new Set([
          "width",
          "height",
          "top",
          "left",
          "right",
          "bottom",
          "x",
          "y",
          "translateX",
          "translateY",
        ]),
        nF = (e) => nI.has(e),
        nB = (e) => Object.keys(e).some(nF),
        nN = (e) => e === nL.Rx || e === z.px,
        nH = (e, t) => parseFloat(e.split(", ")[t]),
        nz =
          (e, t) =>
          (n, { transform: r }) => {
            if ("none" === r || !r) return 0;
            let i = r.match(/^matrix3d\((.+)\)$/);
            if (i) return nH(i[1], t);
            {
              let t = r.match(/^matrix\((.+)\)$/);
              return t ? nH(t[1], e) : 0;
            }
          },
        nW = new Set(["x", "y", "z"]),
        nU = C._.filter((e) => !nW.has(e)),
        n$ = {
          width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) =>
            e.max - e.min - parseFloat(t) - parseFloat(n),
          height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) =>
            e.max - e.min - parseFloat(t) - parseFloat(n),
          top: (e, { top: t }) => parseFloat(t),
          left: (e, { left: t }) => parseFloat(t),
          bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
          right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
          x: nz(4, 13),
          y: nz(5, 14),
        };
      (n$.translateX = n$.x), (n$.translateY = n$.y);
      let nG = (e, t, n) => {
          let r = t.measureViewportBox(),
            i = getComputedStyle(t.current),
            { display: o } = i,
            s = {};
          "none" === o && t.setStaticValue("display", e.display || "block"),
            n.forEach((e) => {
              s[e] = n$[e](r, i);
            }),
            t.render();
          let a = t.measureViewportBox();
          return (
            n.forEach((n) => {
              let r = t.getValue(n);
              r && r.jump(s[n]), (e[n] = n$[n](a, i));
            }),
            e
          );
        },
        nX = (e, t, n = {}, r = {}) => {
          (t = { ...t }), (r = { ...r });
          let i = Object.keys(t).filter(nF),
            o = [],
            s = !1,
            a = [];
          if (
            (i.forEach((i) => {
              let l;
              let u = e.getValue(i);
              if (!e.hasValue(i)) return;
              let d = n[i],
                c = (0, nR.C)(d),
                h = t[i];
              if ((0, ej.C)(h)) {
                let e = h.length,
                  t = null === h[0] ? 1 : 0;
                (d = h[t]), (c = (0, nR.C)(d));
                for (let n = t; n < e && null !== h[n]; n++)
                  l
                    ? (0, eU.k)(
                        (0, nR.C)(h[n]) === l,
                        "All keyframes must be of the same type"
                      )
                    : ((l = (0, nR.C)(h[n])),
                      (0, eU.k)(
                        l === c || (nN(c) && nN(l)),
                        "Keyframes must be of the same dimension as the current value"
                      ));
              } else l = (0, nR.C)(h);
              if (c !== l) {
                if (nN(c) && nN(l)) {
                  let e = u.get();
                  "string" == typeof e && u.set(parseFloat(e)),
                    "string" == typeof h
                      ? (t[i] = parseFloat(h))
                      : Array.isArray(h) &&
                        l === z.px &&
                        (t[i] = h.map(parseFloat));
                } else
                  (null == c ? void 0 : c.transform) &&
                  (null == l ? void 0 : l.transform) &&
                  (0 === d || 0 === h)
                    ? 0 === d
                      ? u.set(l.transform(d))
                      : (t[i] = c.transform(h))
                    : (s ||
                        ((o = (function (e) {
                          let t = [];
                          return (
                            nU.forEach((n) => {
                              let r = e.getValue(n);
                              void 0 !== r &&
                                (t.push([n, r.get()]),
                                r.set(n.startsWith("scale") ? 1 : 0));
                            }),
                            t.length && e.render(),
                            t
                          );
                        })(e)),
                        (s = !0)),
                      a.push(i),
                      (r[i] = void 0 !== r[i] ? r[i] : t[i]),
                      u.jump(h));
              }
            }),
            !a.length)
          )
            return { target: t, transitionEnd: r };
          {
            let n = a.indexOf("height") >= 0 ? window.pageYOffset : null,
              i = nG(t, e, a);
            return (
              o.length &&
                o.forEach(([t, n]) => {
                  e.getValue(t).set(n);
                }),
              e.render(),
              x.j && null !== n && window.scrollTo({ top: n }),
              { target: i, transitionEnd: r }
            );
          }
        },
        nZ = (e, t, n, r) => {
          var i, o;
          let s = (function (e, { ...t }, n) {
            let r = e.current;
            if (!(r instanceof Element)) return { target: t, transitionEnd: n };
            for (let i in (n && (n = { ...n }),
            e.values.forEach((e) => {
              let t = e.get();
              if (!(0, D.tm)(t)) return;
              let n = nj(t, r);
              n && e.set(n);
            }),
            t)) {
              let e = t[i];
              if (!(0, D.tm)(e)) continue;
              let o = nj(e, r);
              o && ((t[i] = o), n || (n = {}), void 0 === n[i] && (n[i] = e));
            }
            return { target: t, transitionEnd: n };
          })(e, t, r);
          return (
            (t = s.target),
            (r = s.transitionEnd),
            (i = t),
            (o = r),
            nB(i) ? nX(e, i, n, o) : { target: i, transitionEnd: o }
          );
        },
        nq = { current: null },
        nY = { current: !1 };
      var nQ = n(9593);
      let nK = new WeakMap(),
        nJ = Object.keys(b),
        n0 = nJ.length,
        n1 = [
          "AnimationStart",
          "AnimationComplete",
          "Update",
          "BeforeLayoutMeasure",
          "LayoutMeasure",
          "LayoutAnimationStart",
          "LayoutAnimationComplete",
        ],
        n3 = m.length;
      class n5 {
        constructor(
          {
            parent: e,
            props: t,
            presenceContext: n,
            reducedMotionConfig: r,
            visualState: i,
          },
          o = {}
        ) {
          (this.current = null),
            (this.children = new Set()),
            (this.isVariantNode = !1),
            (this.isControllingVariants = !1),
            (this.shouldReduceMotion = null),
            (this.values = new Map()),
            (this.features = {}),
            (this.valueSubscriptions = new Map()),
            (this.prevMotionValues = {}),
            (this.events = {}),
            (this.propEventSubscriptions = {}),
            (this.notifyUpdate = () =>
              this.notify("Update", this.latestValues)),
            (this.render = () => {
              this.current &&
                (this.triggerBuild(),
                this.renderInstance(
                  this.current,
                  this.renderState,
                  this.props.style,
                  this.projection
                ));
            }),
            (this.scheduleRender = () => es.Wi.render(this.render, !1, !0));
          let { latestValues: s, renderState: a } = i;
          (this.latestValues = s),
            (this.baseTarget = { ...s }),
            (this.initialValues = t.initial ? { ...s } : {}),
            (this.renderState = a),
            (this.parent = e),
            (this.props = t),
            (this.presenceContext = n),
            (this.depth = e ? e.depth + 1 : 0),
            (this.reducedMotionConfig = r),
            (this.options = o),
            (this.isControllingVariants = g(t)),
            (this.isVariantNode = v(t)),
            this.isVariantNode && (this.variantChildren = new Set()),
            (this.manuallyAnimateOnMount = !!(e && e.current));
          let { willChange: l, ...u } = this.scrapeMotionValuesFromProps(t, {});
          for (let e in u) {
            let t = u[e];
            void 0 !== s[e] &&
              (0, M.i)(t) &&
              (t.set(s[e], !1), (0, nQ.L)(l) && l.add(e));
          }
        }
        scrapeMotionValuesFromProps(e, t) {
          return {};
        }
        mount(e) {
          (this.current = e),
            nK.set(e, this),
            this.projection &&
              !this.projection.instance &&
              this.projection.mount(e),
            this.parent &&
              this.isVariantNode &&
              !this.isControllingVariants &&
              (this.removeFromVariantTree = this.parent.addVariantChild(this)),
            this.values.forEach((e, t) => this.bindToMotionValue(t, e)),
            nY.current ||
              (function () {
                if (((nY.current = !0), x.j)) {
                  if (window.matchMedia) {
                    let e = window.matchMedia("(prefers-reduced-motion)"),
                      t = () => (nq.current = e.matches);
                    e.addListener(t), t();
                  } else nq.current = !1;
                }
              })(),
            (this.shouldReduceMotion =
              "never" !== this.reducedMotionConfig &&
              ("always" === this.reducedMotionConfig || nq.current)),
            this.parent && this.parent.children.add(this),
            this.update(this.props, this.presenceContext);
        }
        unmount() {
          for (let e in (nK.delete(this.current),
          this.projection && this.projection.unmount(),
          (0, es.Pn)(this.notifyUpdate),
          (0, es.Pn)(this.render),
          this.valueSubscriptions.forEach((e) => e()),
          this.removeFromVariantTree && this.removeFromVariantTree(),
          this.parent && this.parent.children.delete(this),
          this.events))
            this.events[e].clear();
          for (let e in this.features) this.features[e].unmount();
          this.current = null;
        }
        bindToMotionValue(e, t) {
          let n = C.G.has(e),
            r = t.on("change", (t) => {
              (this.latestValues[e] = t),
                this.props.onUpdate && es.Wi.update(this.notifyUpdate, !1, !0),
                n && this.projection && (this.projection.isTransformDirty = !0);
            }),
            i = t.on("renderRequest", this.scheduleRender);
          this.valueSubscriptions.set(e, () => {
            r(), i();
          });
        }
        sortNodePosition(e) {
          return this.current &&
            this.sortInstanceNodePosition &&
            this.type === e.type
            ? this.sortInstanceNodePosition(this.current, e.current)
            : 0;
        }
        loadFeatures({ children: e, ...t }, n, r, i) {
          let o, s;
          for (let e = 0; e < n0; e++) {
            let n = nJ[e],
              {
                isEnabled: r,
                Feature: i,
                ProjectionNode: a,
                MeasureLayout: l,
              } = b[n];
            a && (o = a),
              r(t) &&
                (!this.features[n] && i && (this.features[n] = new i(this)),
                l && (s = l));
          }
          if (
            ("html" === this.type || "svg" === this.type) &&
            !this.projection &&
            o
          ) {
            this.projection = new o(
              this.latestValues,
              this.parent && this.parent.projection
            );
            let {
              layoutId: e,
              layout: n,
              drag: r,
              dragConstraints: s,
              layoutScroll: a,
              layoutRoot: l,
            } = t;
            this.projection.setOptions({
              layoutId: e,
              layout: n,
              alwaysMeasureLayout: !!r || (s && c(s)),
              visualElement: this,
              scheduleRender: () => this.scheduleRender(),
              animationType: "string" == typeof n ? n : "both",
              initialPromotionConfig: i,
              layoutScroll: a,
              layoutRoot: l,
            });
          }
          return s;
        }
        updateFeatures() {
          for (let e in this.features) {
            let t = this.features[e];
            t.isMounted ? t.update() : (t.mount(), (t.isMounted = !0));
          }
        }
        triggerBuild() {
          this.build(
            this.renderState,
            this.latestValues,
            this.options,
            this.props
          );
        }
        measureViewportBox() {
          return this.current
            ? this.measureInstanceViewportBox(this.current, this.props)
            : to();
        }
        getStaticValue(e) {
          return this.latestValues[e];
        }
        setStaticValue(e, t) {
          this.latestValues[e] = t;
        }
        makeTargetAnimatable(e, t = !0) {
          return this.makeTargetAnimatableFromInstance(e, this.props, t);
        }
        update(e, t) {
          (e.transformTemplate || this.props.transformTemplate) &&
            this.scheduleRender(),
            (this.prevProps = this.props),
            (this.props = e),
            (this.prevPresenceContext = this.presenceContext),
            (this.presenceContext = t);
          for (let t = 0; t < n1.length; t++) {
            let n = n1[t];
            this.propEventSubscriptions[n] &&
              (this.propEventSubscriptions[n](),
              delete this.propEventSubscriptions[n]);
            let r = e["on" + n];
            r && (this.propEventSubscriptions[n] = this.on(n, r));
          }
          (this.prevMotionValues = (function (e, t, n) {
            let { willChange: r } = t;
            for (let i in t) {
              let o = t[i],
                s = n[i];
              if ((0, M.i)(o)) e.addValue(i, o), (0, nQ.L)(r) && r.add(i);
              else if ((0, M.i)(s))
                e.addValue(i, (0, ne.BX)(o, { owner: e })),
                  (0, nQ.L)(r) && r.remove(i);
              else if (s !== o) {
                if (e.hasValue(i)) {
                  let t = e.getValue(i);
                  t.hasAnimated || t.set(o);
                } else {
                  let t = e.getStaticValue(i);
                  e.addValue(i, (0, ne.BX)(void 0 !== t ? t : o, { owner: e }));
                }
              }
            }
            for (let r in n) void 0 === t[r] && e.removeValue(r);
            return t;
          })(
            this,
            this.scrapeMotionValuesFromProps(e, this.prevProps),
            this.prevMotionValues
          )),
            this.handleChildMotionValue && this.handleChildMotionValue();
        }
        getProps() {
          return this.props;
        }
        getVariant(e) {
          return this.props.variants ? this.props.variants[e] : void 0;
        }
        getDefaultTransition() {
          return this.props.transition;
        }
        getTransformPagePoint() {
          return this.props.transformPagePoint;
        }
        getClosestVariantNode() {
          return this.isVariantNode
            ? this
            : this.parent
            ? this.parent.getClosestVariantNode()
            : void 0;
        }
        getVariantContext(e = !1) {
          if (e) return this.parent ? this.parent.getVariantContext() : void 0;
          if (!this.isControllingVariants) {
            let e = (this.parent && this.parent.getVariantContext()) || {};
            return (
              void 0 !== this.props.initial && (e.initial = this.props.initial),
              e
            );
          }
          let t = {};
          for (let e = 0; e < n3; e++) {
            let n = m[e],
              r = this.props[n];
            (h(r) || !1 === r) && (t[n] = r);
          }
          return t;
        }
        addVariantChild(e) {
          let t = this.getClosestVariantNode();
          if (t)
            return (
              t.variantChildren && t.variantChildren.add(e),
              () => t.variantChildren.delete(e)
            );
        }
        addValue(e, t) {
          t !== this.values.get(e) &&
            (this.removeValue(e), this.bindToMotionValue(e, t)),
            this.values.set(e, t),
            (this.latestValues[e] = t.get());
        }
        removeValue(e) {
          this.values.delete(e);
          let t = this.valueSubscriptions.get(e);
          t && (t(), this.valueSubscriptions.delete(e)),
            delete this.latestValues[e],
            this.removeValueFromRenderState(e, this.renderState);
        }
        hasValue(e) {
          return this.values.has(e);
        }
        getValue(e, t) {
          if (this.props.values && this.props.values[e])
            return this.props.values[e];
          let n = this.values.get(e);
          return (
            void 0 === n &&
              void 0 !== t &&
              ((n = (0, ne.BX)(t, { owner: this })), this.addValue(e, n)),
            n
          );
        }
        readValue(e) {
          var t;
          return void 0 === this.latestValues[e] && this.current
            ? null !== (t = this.getBaseTargetFromProps(this.props, e)) &&
              void 0 !== t
              ? t
              : this.readValueFromInstance(this.current, e, this.options)
            : this.latestValues[e];
        }
        setBaseTarget(e, t) {
          this.baseTarget[e] = t;
        }
        getBaseTarget(e) {
          var t;
          let { initial: n } = this.props,
            r =
              "string" == typeof n || "object" == typeof n
                ? null === (t = (0, et.o)(this.props, n)) || void 0 === t
                  ? void 0
                  : t[e]
                : void 0;
          if (n && void 0 !== r) return r;
          let i = this.getBaseTargetFromProps(this.props, e);
          return void 0 === i || (0, M.i)(i)
            ? void 0 !== this.initialValues[e] && void 0 === r
              ? void 0
              : this.baseTarget[e]
            : i;
        }
        on(e, t) {
          return (
            this.events[e] || (this.events[e] = new tI.L()),
            this.events[e].add(t)
          );
        }
        notify(e, ...t) {
          this.events[e] && this.events[e].notify(...t);
        }
      }
      class n2 extends n5 {
        sortInstanceNodePosition(e, t) {
          return 2 & e.compareDocumentPosition(t) ? 1 : -1;
        }
        getBaseTargetFromProps(e, t) {
          return e.style ? e.style[t] : void 0;
        }
        removeValueFromRenderState(e, { vars: t, style: n }) {
          delete t[e], delete n[e];
        }
        makeTargetAnimatableFromInstance(
          { transition: e, transitionEnd: t, ...n },
          { transformValues: r },
          i
        ) {
          let o = (0, nO.P$)(n, e || {}, this);
          if ((r && (t && (t = r(t)), n && (n = r(n)), o && (o = r(o))), i)) {
            (0, nO.GJ)(this, n, o);
            let e = nZ(this, n, o, t);
            (t = e.transitionEnd), (n = e.target);
          }
          return { transition: e, transitionEnd: t, ...n };
        }
      }
      class n4 extends n2 {
        constructor() {
          super(...arguments), (this.type = "html");
        }
        readValueFromInstance(e, t) {
          if (C.G.has(t)) {
            let e = (0, nM.A)(t);
            return (e && e.default) || 0;
          }
          {
            let n = window.getComputedStyle(e),
              r = ((0, D.f9)(t) ? n.getPropertyValue(t) : n[t]) || 0;
            return "string" == typeof r ? r.trim() : r;
          }
        }
        measureInstanceViewportBox(e, { transformPagePoint: t }) {
          return tx(e, t);
        }
        build(e, t, n, r) {
          L(e, t, n, r.transformTemplate);
        }
        scrapeMotionValuesFromProps(e, t) {
          return J(e, t);
        }
        handleChildMotionValue() {
          this.childSubscription &&
            (this.childSubscription(), delete this.childSubscription);
          let { children: e } = this.props;
          (0, M.i)(e) &&
            (this.childSubscription = e.on("change", (e) => {
              this.current && (this.current.textContent = `${e}`);
            }));
        }
        renderInstance(e, t, n, r) {
          Y(e, t, n, r);
        }
      }
      class n6 extends n2 {
        constructor() {
          super(...arguments), (this.type = "svg"), (this.isSVGTag = !1);
        }
        getBaseTargetFromProps(e, t) {
          return e[t];
        }
        readValueFromInstance(e, t) {
          if (C.G.has(t)) {
            let e = (0, nM.A)(t);
            return (e && e.default) || 0;
          }
          return (t = Q.has(t) ? t : (0, q.D)(t)), e.getAttribute(t);
        }
        measureInstanceViewportBox() {
          return to();
        }
        scrapeMotionValuesFromProps(e, t) {
          return ee(e, t);
        }
        build(e, t, n, r) {
          G(e, t, n, this.isSVGTag, r.transformTemplate);
        }
        renderInstance(e, t, n, r) {
          K(e, t, n, r);
        }
        mount(e) {
          (this.isSVGTag = Z(e.tagName)), super.mount(e);
        }
      }
      let n9 = (e, t) =>
          S(e)
            ? new n6(t, { enableHardwareAcceleration: !1 })
            : new n4(t, { enableHardwareAcceleration: !0 }),
        n7 = {
          animation: { Feature: eH },
          exit: { Feature: eW },
          inView: { Feature: eD },
          tap: { Feature: ek },
          focus: { Feature: eA },
          hover: { Feature: ew },
          pan: { Feature: tE },
          drag: { Feature: tk, ProjectionNode: nE, MeasureLayout: tR },
          layout: { ProjectionNode: nE, MeasureLayout: tR },
        },
        n8 = (function (e) {
          function t(t, n = {}) {
            return (function ({
              preloadedFeatures: e,
              createVisualElement: t,
              useRender: n,
              useVisualState: r,
              Component: p,
            }) {
              e &&
                (function (e) {
                  for (let t in e) b[t] = { ...b[t], ...e[t] };
                })(e);
              let f = (0, i.forwardRef)(function (f, m) {
                var v;
                let _;
                let b = {
                    ...(0, i.useContext)(o),
                    ...f,
                    layoutId: (function ({ layoutId: e }) {
                      let t = (0, i.useContext)(w).id;
                      return t && void 0 !== e ? t + "-" + e : e;
                    })(f),
                  },
                  { isStatic: P } = b,
                  T = (function (e) {
                    let { initial: t, animate: n } = (function (e, t) {
                      if (g(e)) {
                        let { initial: t, animate: n } = e;
                        return {
                          initial: !1 === t || h(t) ? t : void 0,
                          animate: h(n) ? n : void 0,
                        };
                      }
                      return !1 !== e.inherit ? t : {};
                    })(e, (0, i.useContext)(s));
                    return (0, i.useMemo)(
                      () => ({ initial: t, animate: n }),
                      [y(t), y(n)]
                    );
                  })(f),
                  S = r(f, P);
                if (!P && x.j) {
                  T.visualElement = (function (e, t, n, r) {
                    let { visualElement: c } = (0, i.useContext)(s),
                      h = (0, i.useContext)(u),
                      p = (0, i.useContext)(a),
                      f = (0, i.useContext)(o).reducedMotion,
                      m = (0, i.useRef)();
                    (r = r || h.renderer),
                      !m.current &&
                        r &&
                        (m.current = r(e, {
                          visualState: t,
                          parent: c,
                          props: n,
                          presenceContext: p,
                          blockInitialAnimation: !!p && !1 === p.initial,
                          reducedMotionConfig: f,
                        }));
                    let g = m.current;
                    (0, i.useInsertionEffect)(() => {
                      g && g.update(n, p);
                    });
                    let v = (0, i.useRef)(
                      !!(n[d.M] && !window.HandoffComplete)
                    );
                    return (
                      (0, l.L)(() => {
                        g &&
                          (g.render(),
                          v.current &&
                            g.animationState &&
                            g.animationState.animateChanges());
                      }),
                      (0, i.useEffect)(() => {
                        g &&
                          (g.updateFeatures(),
                          !v.current &&
                            g.animationState &&
                            g.animationState.animateChanges(),
                          v.current &&
                            ((v.current = !1), (window.HandoffComplete = !0)));
                      }),
                      g
                    );
                  })(p, S, b, t);
                  let n = (0, i.useContext)(A),
                    r = (0, i.useContext)(u).strict;
                  T.visualElement &&
                    (_ = T.visualElement.loadFeatures(b, r, e, n));
                }
                return i.createElement(
                  s.Provider,
                  { value: T },
                  _ && T.visualElement
                    ? i.createElement(_, {
                        visualElement: T.visualElement,
                        ...b,
                      })
                    : null,
                  n(
                    p,
                    f,
                    ((v = T.visualElement),
                    (0, i.useCallback)(
                      (e) => {
                        e && S.mount && S.mount(e),
                          v && (e ? v.mount(e) : v.unmount()),
                          m &&
                            ("function" == typeof m
                              ? m(e)
                              : c(m) && (m.current = e));
                      },
                      [v]
                    )),
                    S,
                    P,
                    T.visualElement
                  )
                );
              });
              return (f[P] = p), f;
            })(e(t, n));
          }
          if ("undefined" == typeof Proxy) return t;
          let n = new Map();
          return new Proxy(t, {
            get: (e, r) => (n.has(r) || n.set(r, t(r)), n.get(r)),
          });
        })((e, t) =>
          (function (e, { forwardMotionProps: t = !1 }, n, r) {
            return {
              ...(S(e) ? ea : el),
              preloadedFeatures: n,
              useRender: (function (e = !1) {
                return (t, n, r, { latestValues: o }, s) => {
                  let a = (
                      S(t)
                        ? function (e, t, n, r) {
                            let o = (0, i.useMemo)(() => {
                              let n = X();
                              return (
                                G(
                                  n,
                                  t,
                                  { enableHardwareAcceleration: !1 },
                                  Z(r),
                                  e.transformTemplate
                                ),
                                { ...n.attrs, style: { ...n.style } }
                              );
                            }, [t]);
                            if (e.style) {
                              let t = {};
                              F(t, e.style, e),
                                (o.style = { ...t, ...o.style });
                            }
                            return o;
                          }
                        : function (e, t, n) {
                            let r = {},
                              o = (function (e, t, n) {
                                let r = e.style || {},
                                  o = {};
                                return (
                                  F(o, r, e),
                                  Object.assign(
                                    o,
                                    (function ({ transformTemplate: e }, t, n) {
                                      return (0, i.useMemo)(() => {
                                        let r = I();
                                        return (
                                          L(
                                            r,
                                            t,
                                            { enableHardwareAcceleration: !n },
                                            e
                                          ),
                                          Object.assign({}, r.vars, r.style)
                                        );
                                      }, [t]);
                                    })(e, t, n)
                                  ),
                                  e.transformValues ? e.transformValues(o) : o
                                );
                              })(e, t, n);
                            return (
                              e.drag &&
                                !1 !== e.dragListener &&
                                ((r.draggable = !1),
                                (o.userSelect =
                                  o.WebkitUserSelect =
                                  o.WebkitTouchCallout =
                                    "none"),
                                (o.touchAction =
                                  !0 === e.drag
                                    ? "none"
                                    : `pan-${"x" === e.drag ? "y" : "x"}`)),
                              void 0 === e.tabIndex &&
                                (e.onTap || e.onTapStart || e.whileTap) &&
                                (r.tabIndex = 0),
                              (r.style = o),
                              r
                            );
                          }
                    )(n, o, s, t),
                    l = {
                      ...(function (e, t, n) {
                        let r = {};
                        for (let i in e)
                          ("values" !== i || "object" != typeof e.values) &&
                            (H(i) ||
                              (!0 === n && N(i)) ||
                              (!t && !N(i)) ||
                              (e.draggable && i.startsWith("onDrag"))) &&
                            (r[i] = e[i]);
                        return r;
                      })(n, "string" == typeof t, e),
                      ...a,
                      ref: r,
                    },
                    { children: u } = n,
                    d = (0, i.useMemo)(() => ((0, M.i)(u) ? u.get() : u), [u]);
                  return (0, i.createElement)(t, { ...l, children: d });
                };
              })(t),
              createVisualElement: r,
              Component: e,
            };
          })(e, t, n7, n9)
        );
    },
    7444: function (e, t, n) {
      "use strict";
      n.d(t, {
        D: function () {
          return r;
        },
      });
      let r = (e) => e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    },
    7249: function (e, t, n) {
      "use strict";
      n.d(t, {
        Xp: function () {
          return s;
        },
        f9: function () {
          return i;
        },
        tm: function () {
          return o;
        },
      });
      let r = (e) => (t) => "string" == typeof t && t.startsWith(e),
        i = r("--"),
        o = r("var(--"),
        s =
          /var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)/g;
    },
    5861: function (e, t, n) {
      "use strict";
      n.d(t, {
        T: function () {
          return s;
        },
      });
      var r = n(5636),
        i = n(2779),
        o = n(2005);
      function s(e, t) {
        let n = (0, o.A)(e);
        return (
          n !== i.h && (n = r.P),
          n.getAnimatableNone ? n.getAnimatableNone(t) : void 0
        );
      }
    },
    2005: function (e, t, n) {
      "use strict";
      n.d(t, {
        A: function () {
          return s;
        },
      });
      var r = n(3964),
        i = n(2779);
      let o = {
          ...n(8325).j,
          color: r.$,
          backgroundColor: r.$,
          outlineColor: r.$,
          fill: r.$,
          stroke: r.$,
          borderColor: r.$,
          borderTopColor: r.$,
          borderRightColor: r.$,
          borderBottomColor: r.$,
          borderLeftColor: r.$,
          filter: i.h,
          WebkitFilter: i.h,
        },
        s = (e) => o[e];
    },
    8580: function (e, t, n) {
      "use strict";
      n.d(t, {
        $: function () {
          return s;
        },
        C: function () {
          return a;
        },
      });
      var r = n(4305),
        i = n(7492),
        o = n(5113);
      let s = [
          r.Rx,
          i.px,
          i.aQ,
          i.RW,
          i.vw,
          i.vh,
          { test: (e) => "auto" === e, parse: (e) => e },
        ],
        a = (e) => s.find((0, o.l)(e));
    },
    8325: function (e, t, n) {
      "use strict";
      n.d(t, {
        j: function () {
          return s;
        },
      });
      var r = n(4305),
        i = n(7492);
      let o = { ...r.Rx, transform: Math.round },
        s = {
          borderWidth: i.px,
          borderTopWidth: i.px,
          borderRightWidth: i.px,
          borderBottomWidth: i.px,
          borderLeftWidth: i.px,
          borderRadius: i.px,
          radius: i.px,
          borderTopLeftRadius: i.px,
          borderTopRightRadius: i.px,
          borderBottomRightRadius: i.px,
          borderBottomLeftRadius: i.px,
          width: i.px,
          maxWidth: i.px,
          height: i.px,
          maxHeight: i.px,
          size: i.px,
          top: i.px,
          right: i.px,
          bottom: i.px,
          left: i.px,
          padding: i.px,
          paddingTop: i.px,
          paddingRight: i.px,
          paddingBottom: i.px,
          paddingLeft: i.px,
          margin: i.px,
          marginTop: i.px,
          marginRight: i.px,
          marginBottom: i.px,
          marginLeft: i.px,
          rotate: i.RW,
          rotateX: i.RW,
          rotateY: i.RW,
          rotateZ: i.RW,
          scale: r.bA,
          scaleX: r.bA,
          scaleY: r.bA,
          scaleZ: r.bA,
          skew: i.RW,
          skewX: i.RW,
          skewY: i.RW,
          distance: i.px,
          translateX: i.px,
          translateY: i.px,
          translateZ: i.px,
          x: i.px,
          y: i.px,
          z: i.px,
          perspective: i.px,
          transformPerspective: i.px,
          opacity: r.Fq,
          originX: i.$C,
          originY: i.$C,
          originZ: i.px,
          zIndex: o,
          fillOpacity: r.Fq,
          strokeOpacity: r.Fq,
          numOctaves: o,
        };
    },
    5113: function (e, t, n) {
      "use strict";
      n.d(t, {
        l: function () {
          return r;
        },
      });
      let r = (e) => (t) => t.test(e);
    },
    8834: function (e, t, n) {
      "use strict";
      n.d(t, {
        G: function () {
          return i;
        },
        _: function () {
          return r;
        },
      });
      let r = [
          "transformPerspective",
          "x",
          "y",
          "z",
          "translateX",
          "translateY",
          "translateZ",
          "scale",
          "scaleX",
          "scaleY",
          "rotate",
          "rotateX",
          "rotateY",
          "rotateZ",
          "skew",
          "skewX",
          "skewY",
        ],
        i = new Set(r);
    },
    8775: function (e, t, n) {
      "use strict";
      n.d(t, {
        x: function () {
          return i;
        },
      });
      var r = n(1297);
      function i(e, t, n) {
        let i = e.getProps();
        return (0, r.o)(
          i,
          t,
          void 0 !== n ? n : i.custom,
          (function (e) {
            let t = {};
            return e.values.forEach((e, n) => (t[n] = e.get())), t;
          })(e),
          (function (e) {
            let t = {};
            return e.values.forEach((e, n) => (t[n] = e.getVelocity())), t;
          })(e)
        );
      }
    },
    1297: function (e, t, n) {
      "use strict";
      function r(e, t, n, r = {}, i = {}) {
        return (
          "function" == typeof t && (t = t(void 0 !== n ? n : e.custom, r, i)),
          "string" == typeof t && (t = e.variants && e.variants[t]),
          "function" == typeof t && (t = t(void 0 !== n ? n : e.custom, r, i)),
          t
        );
      }
      n.d(t, {
        o: function () {
          return r;
        },
      });
    },
    6179: function (e, t, n) {
      "use strict";
      n.d(t, {
        GJ: function () {
          return y;
        },
        P$: function () {
          return _;
        },
        CD: function () {
          return m;
        },
        gg: function () {
          return v;
        },
      });
      var r = n(4946),
        i = n(3697),
        o = n(4581),
        s = n(3078),
        a = n(5636),
        l = n(5861),
        u = n(3964),
        d = n(8580),
        c = n(5113);
      let h = [...d.$, u.$, a.P],
        p = (e) => h.find((0, c.l)(e));
      var f = n(8775);
      function m(e, t) {
        let n = (0, f.x)(e, t),
          {
            transitionEnd: r = {},
            transition: i = {},
            ...a
          } = n ? e.makeTargetAnimatable(n, !1) : {};
        for (let t in (a = { ...a, ...r })) {
          let n = (0, o.Y)(a[t]);
          e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, (0, s.BX)(n));
        }
      }
      function g(e, t) {
        [...t].reverse().forEach((n) => {
          let r = e.getVariant(n);
          r && m(e, r),
            e.variantChildren &&
              e.variantChildren.forEach((e) => {
                g(e, t);
              });
        });
      }
      function v(e, t) {
        return Array.isArray(t)
          ? g(e, t)
          : "string" == typeof t
          ? g(e, [t])
          : void m(e, t);
      }
      function y(e, t, n) {
        var o, u;
        let d = Object.keys(t).filter((t) => !e.hasValue(t)),
          c = d.length;
        if (c)
          for (let h = 0; h < c; h++) {
            let c = d[h],
              f = t[c],
              m = null;
            Array.isArray(f) && (m = f[0]),
              null === m &&
                (m =
                  null !==
                    (u =
                      null !== (o = n[c]) && void 0 !== o
                        ? o
                        : e.readValue(c)) && void 0 !== u
                    ? u
                    : t[c]),
              null != m &&
                ("string" == typeof m && ((0, r.P)(m) || (0, i.W)(m))
                  ? (m = parseFloat(m))
                  : !p(m) && a.P.test(f) && (m = (0, l.T)(c, f)),
                e.addValue(c, (0, s.BX)(m, { owner: e })),
                void 0 === n[c] && (n[c] = m),
                null !== m && e.setBaseTarget(c, m));
          }
      }
      function _(e, t, n) {
        let r = {};
        for (let i in e) {
          let e = (function (e, t) {
            if (t) return (t[e] || t.default || t).from;
          })(i, t);
          if (void 0 !== e) r[i] = e;
          else {
            let e = n.getValue(i);
            e && (r[i] = e.get());
          }
        }
        return r;
      }
    },
    9013: function (e, t, n) {
      "use strict";
      function r(e, t) {
        -1 === e.indexOf(t) && e.push(t);
      }
      function i(e, t) {
        let n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      n.d(t, {
        cl: function () {
          return i;
        },
        y4: function () {
          return r;
        },
      });
    },
    9111: function (e, t, n) {
      "use strict";
      n.d(t, {
        u: function () {
          return r;
        },
      });
      let r = (e, t, n) => Math.min(Math.max(n, e), t);
    },
    3223: function (e, t, n) {
      "use strict";
      n.d(t, {
        K: function () {
          return i;
        },
        k: function () {
          return o;
        },
      });
      var r = n(4439);
      let i = r.Z,
        o = r.Z;
    },
    4563: function (e, t, n) {
      "use strict";
      n.d(t, {
        j: function () {
          return r;
        },
      });
      let r = "undefined" != typeof document;
    },
    4946: function (e, t, n) {
      "use strict";
      n.d(t, {
        P: function () {
          return r;
        },
      });
      let r = (e) => /^\-?\d*\.?\d+$/.test(e);
    },
    3697: function (e, t, n) {
      "use strict";
      n.d(t, {
        W: function () {
          return r;
        },
      });
      let r = (e) => /^0[^.\s]+$/.test(e);
    },
    8090: function (e, t, n) {
      "use strict";
      n.d(t, {
        C: function () {
          return r;
        },
      });
      let r = (e, t, n) => -n * e + n * t + e;
    },
    4439: function (e, t, n) {
      "use strict";
      n.d(t, {
        Z: function () {
          return r;
        },
      });
      let r = (e) => e;
    },
    332: function (e, t, n) {
      "use strict";
      n.d(t, {
        z: function () {
          return i;
        },
      });
      let r = (e, t) => (n) => t(e(n)),
        i = (...e) => e.reduce(r);
    },
    6376: function (e, t, n) {
      "use strict";
      n.d(t, {
        Y: function () {
          return r;
        },
      });
      let r = (e, t, n) => {
        let r = t - e;
        return 0 === r ? 1 : (n - e) / r;
      };
    },
    4581: function (e, t, n) {
      "use strict";
      n.d(t, {
        Y: function () {
          return o;
        },
        p: function () {
          return i;
        },
      });
      var r = n(4944);
      let i = (e) => !!(e && "object" == typeof e && e.mix && e.toValue),
        o = (e) => ((0, r.C)(e) ? e[e.length - 1] || 0 : e);
    },
    4081: function (e, t, n) {
      "use strict";
      n.d(t, {
        L: function () {
          return i;
        },
      });
      var r = n(9013);
      class i {
        constructor() {
          this.subscriptions = [];
        }
        add(e) {
          return (
            (0, r.y4)(this.subscriptions, e),
            () => (0, r.cl)(this.subscriptions, e)
          );
        }
        notify(e, t, n) {
          let r = this.subscriptions.length;
          if (r) {
            if (1 === r) this.subscriptions[0](e, t, n);
            else
              for (let i = 0; i < r; i++) {
                let r = this.subscriptions[i];
                r && r(e, t, n);
              }
          }
        }
        getSize() {
          return this.subscriptions.length;
        }
        clear() {
          this.subscriptions.length = 0;
        }
      }
    },
    6717: function (e, t, n) {
      "use strict";
      n.d(t, {
        X: function () {
          return i;
        },
        w: function () {
          return r;
        },
      });
      let r = (e) => 1e3 * e,
        i = (e) => e / 1e3;
    },
    3576: function (e, t, n) {
      "use strict";
      n.d(t, {
        h: function () {
          return i;
        },
      });
      var r = n(2265);
      function i(e) {
        let t = (0, r.useRef)(null);
        return null === t.current && (t.current = e()), t.current;
      }
    },
    1534: function (e, t, n) {
      "use strict";
      n.d(t, {
        L: function () {
          return i;
        },
      });
      var r = n(2265);
      let i = n(4563).j ? r.useLayoutEffect : r.useEffect;
    },
    4438: function (e, t, n) {
      "use strict";
      function r(e, t) {
        return t ? (1e3 / t) * e : 0;
      }
      n.d(t, {
        R: function () {
          return r;
        },
      });
    },
    3078: function (e, t, n) {
      "use strict";
      n.d(t, {
        BX: function () {
          return u;
        },
      });
      var r = n(4081),
        i = n(4438),
        o = n(8345);
      let s = (e) => !isNaN(parseFloat(e)),
        a = { current: void 0 };
      class l {
        constructor(e, t = {}) {
          (this.version = "10.18.0"),
            (this.timeDelta = 0),
            (this.lastUpdated = 0),
            (this.canTrackVelocity = !1),
            (this.events = {}),
            (this.updateAndNotify = (e, t = !0) => {
              (this.prev = this.current), (this.current = e);
              let { delta: n, timestamp: r } = o.frameData;
              this.lastUpdated !== r &&
                ((this.timeDelta = n),
                (this.lastUpdated = r),
                o.Wi.postRender(this.scheduleVelocityCheck)),
                this.prev !== this.current &&
                  this.events.change &&
                  this.events.change.notify(this.current),
                this.events.velocityChange &&
                  this.events.velocityChange.notify(this.getVelocity()),
                t &&
                  this.events.renderRequest &&
                  this.events.renderRequest.notify(this.current);
            }),
            (this.scheduleVelocityCheck = () =>
              o.Wi.postRender(this.velocityCheck)),
            (this.velocityCheck = ({ timestamp: e }) => {
              e !== this.lastUpdated &&
                ((this.prev = this.current),
                this.events.velocityChange &&
                  this.events.velocityChange.notify(this.getVelocity()));
            }),
            (this.hasAnimated = !1),
            (this.prev = this.current = e),
            (this.canTrackVelocity = s(this.current)),
            (this.owner = t.owner);
        }
        onChange(e) {
          return this.on("change", e);
        }
        on(e, t) {
          this.events[e] || (this.events[e] = new r.L());
          let n = this.events[e].add(t);
          return "change" === e
            ? () => {
                n(),
                  o.Wi.read(() => {
                    this.events.change.getSize() || this.stop();
                  });
              }
            : n;
        }
        clearListeners() {
          for (let e in this.events) this.events[e].clear();
        }
        attach(e, t) {
          (this.passiveEffect = e), (this.stopPassiveEffect = t);
        }
        set(e, t = !0) {
          t && this.passiveEffect
            ? this.passiveEffect(e, this.updateAndNotify)
            : this.updateAndNotify(e, t);
        }
        setWithVelocity(e, t, n) {
          this.set(t), (this.prev = e), (this.timeDelta = n);
        }
        jump(e) {
          this.updateAndNotify(e),
            (this.prev = e),
            this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect();
        }
        get() {
          return a.current && a.current.push(this), this.current;
        }
        getPrevious() {
          return this.prev;
        }
        getVelocity() {
          return this.canTrackVelocity
            ? (0, i.R)(
                parseFloat(this.current) - parseFloat(this.prev),
                this.timeDelta
              )
            : 0;
        }
        start(e) {
          return (
            this.stop(),
            new Promise((t) => {
              (this.hasAnimated = !0),
                (this.animation = e(t)),
                this.events.animationStart &&
                  this.events.animationStart.notify();
            }).then(() => {
              this.events.animationComplete &&
                this.events.animationComplete.notify(),
                this.clearAnimation();
            })
          );
        }
        stop() {
          this.animation &&
            (this.animation.stop(),
            this.events.animationCancel &&
              this.events.animationCancel.notify()),
            this.clearAnimation();
        }
        isAnimating() {
          return !!this.animation;
        }
        clearAnimation() {
          delete this.animation;
        }
        destroy() {
          this.clearListeners(),
            this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect();
        }
      }
      function u(e, t) {
        return new l(e, t);
      }
    },
    7325: function (e, t, n) {
      "use strict";
      n.d(t, {
        $: function () {
          return i;
        },
      });
      var r = n(8859);
      let i = {
        test: (0, n(2702).i)("#"),
        parse: function (e) {
          let t = "",
            n = "",
            r = "",
            i = "";
          return (
            e.length > 5
              ? ((t = e.substring(1, 3)),
                (n = e.substring(3, 5)),
                (r = e.substring(5, 7)),
                (i = e.substring(7, 9)))
              : ((t = e.substring(1, 2)),
                (n = e.substring(2, 3)),
                (r = e.substring(3, 4)),
                (i = e.substring(4, 5)),
                (t += t),
                (n += n),
                (r += r),
                (i += i)),
            {
              red: parseInt(t, 16),
              green: parseInt(n, 16),
              blue: parseInt(r, 16),
              alpha: i ? parseInt(i, 16) / 255 : 1,
            }
          );
        },
        transform: r.m.transform,
      };
    },
    2943: function (e, t, n) {
      "use strict";
      n.d(t, {
        J: function () {
          return a;
        },
      });
      var r = n(4305),
        i = n(7492),
        o = n(796),
        s = n(2702);
      let a = {
        test: (0, s.i)("hsl", "hue"),
        parse: (0, s.d)("hue", "saturation", "lightness"),
        transform: ({ hue: e, saturation: t, lightness: n, alpha: s = 1 }) =>
          "hsla(" +
          Math.round(e) +
          ", " +
          i.aQ.transform((0, o.Nw)(t)) +
          ", " +
          i.aQ.transform((0, o.Nw)(n)) +
          ", " +
          (0, o.Nw)(r.Fq.transform(s)) +
          ")",
      };
    },
    3964: function (e, t, n) {
      "use strict";
      n.d(t, {
        $: function () {
          return a;
        },
      });
      var r = n(796),
        i = n(7325),
        o = n(2943),
        s = n(8859);
      let a = {
        test: (e) => s.m.test(e) || i.$.test(e) || o.J.test(e),
        parse: (e) =>
          s.m.test(e)
            ? s.m.parse(e)
            : o.J.test(e)
            ? o.J.parse(e)
            : i.$.parse(e),
        transform: (e) =>
          (0, r.HD)(e)
            ? e
            : e.hasOwnProperty("red")
            ? s.m.transform(e)
            : o.J.transform(e),
      };
    },
    8859: function (e, t, n) {
      "use strict";
      n.d(t, {
        m: function () {
          return u;
        },
      });
      var r = n(9111),
        i = n(4305),
        o = n(796),
        s = n(2702);
      let a = (e) => (0, r.u)(0, 255, e),
        l = { ...i.Rx, transform: (e) => Math.round(a(e)) },
        u = {
          test: (0, s.i)("rgb", "red"),
          parse: (0, s.d)("red", "green", "blue"),
          transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) =>
            "rgba(" +
            l.transform(e) +
            ", " +
            l.transform(t) +
            ", " +
            l.transform(n) +
            ", " +
            (0, o.Nw)(i.Fq.transform(r)) +
            ")",
        };
    },
    2702: function (e, t, n) {
      "use strict";
      n.d(t, {
        d: function () {
          return o;
        },
        i: function () {
          return i;
        },
      });
      var r = n(796);
      let i = (e, t) => (n) =>
          !!(
            ((0, r.HD)(n) && r.mj.test(n) && n.startsWith(e)) ||
            (t && Object.prototype.hasOwnProperty.call(n, t))
          ),
        o = (e, t, n) => (i) => {
          if (!(0, r.HD)(i)) return i;
          let [o, s, a, l] = i.match(r.KP);
          return {
            [e]: parseFloat(o),
            [t]: parseFloat(s),
            [n]: parseFloat(a),
            alpha: void 0 !== l ? parseFloat(l) : 1,
          };
        };
    },
    2779: function (e, t, n) {
      "use strict";
      n.d(t, {
        h: function () {
          return l;
        },
      });
      var r = n(5636),
        i = n(796);
      let o = new Set(["brightness", "contrast", "saturate", "opacity"]);
      function s(e) {
        let [t, n] = e.slice(0, -1).split("(");
        if ("drop-shadow" === t) return e;
        let [r] = n.match(i.KP) || [];
        if (!r) return e;
        let s = n.replace(r, ""),
          a = o.has(t) ? 1 : 0;
        return r !== n && (a *= 100), t + "(" + a + s + ")";
      }
      let a = /([a-z-]*)\(.*?\)/g,
        l = {
          ...r.P,
          getAnimatableNone: (e) => {
            let t = e.match(a);
            return t ? t.map(s).join(" ") : e;
          },
        };
    },
    5636: function (e, t, n) {
      "use strict";
      n.d(t, {
        P: function () {
          return g;
        },
        V: function () {
          return h;
        },
      });
      var r = n(7249),
        i = n(4439),
        o = n(3964),
        s = n(4305),
        a = n(796);
      let l = { regex: r.Xp, countKey: "Vars", token: "${v}", parse: i.Z },
        u = {
          regex: a.dA,
          countKey: "Colors",
          token: "${c}",
          parse: o.$.parse,
        },
        d = {
          regex: a.KP,
          countKey: "Numbers",
          token: "${n}",
          parse: s.Rx.parse,
        };
      function c(e, { regex: t, countKey: n, token: r, parse: i }) {
        let o = e.tokenised.match(t);
        o &&
          ((e["num" + n] = o.length),
          (e.tokenised = e.tokenised.replace(t, r)),
          e.values.push(...o.map(i)));
      }
      function h(e) {
        let t = e.toString(),
          n = {
            value: t,
            tokenised: t,
            values: [],
            numVars: 0,
            numColors: 0,
            numNumbers: 0,
          };
        return n.value.includes("var(--") && c(n, l), c(n, u), c(n, d), n;
      }
      function p(e) {
        return h(e).values;
      }
      function f(e) {
        let { values: t, numColors: n, numVars: r, tokenised: i } = h(e),
          s = t.length;
        return (e) => {
          let t = i;
          for (let i = 0; i < s; i++)
            t =
              i < r
                ? t.replace(l.token, e[i])
                : i < r + n
                ? t.replace(u.token, o.$.transform(e[i]))
                : t.replace(d.token, (0, a.Nw)(e[i]));
          return t;
        };
      }
      let m = (e) => ("number" == typeof e ? 0 : e),
        g = {
          test: function (e) {
            var t, n;
            return (
              isNaN(e) &&
              (0, a.HD)(e) &&
              ((null === (t = e.match(a.KP)) || void 0 === t
                ? void 0
                : t.length) || 0) +
                ((null === (n = e.match(a.dA)) || void 0 === n
                  ? void 0
                  : n.length) || 0) >
                0
            );
          },
          parse: p,
          createTransformer: f,
          getAnimatableNone: function (e) {
            let t = p(e);
            return f(e)(t.map(m));
          },
        };
    },
    4305: function (e, t, n) {
      "use strict";
      n.d(t, {
        Fq: function () {
          return o;
        },
        Rx: function () {
          return i;
        },
        bA: function () {
          return s;
        },
      });
      var r = n(9111);
      let i = {
          test: (e) => "number" == typeof e,
          parse: parseFloat,
          transform: (e) => e,
        },
        o = { ...i, transform: (e) => (0, r.u)(0, 1, e) },
        s = { ...i, default: 1 };
    },
    7492: function (e, t, n) {
      "use strict";
      n.d(t, {
        $C: function () {
          return d;
        },
        RW: function () {
          return o;
        },
        aQ: function () {
          return s;
        },
        px: function () {
          return a;
        },
        vh: function () {
          return l;
        },
        vw: function () {
          return u;
        },
      });
      var r = n(796);
      let i = (e) => ({
          test: (t) =>
            (0, r.HD)(t) && t.endsWith(e) && 1 === t.split(" ").length,
          parse: parseFloat,
          transform: (t) => `${t}${e}`,
        }),
        o = i("deg"),
        s = i("%"),
        a = i("px"),
        l = i("vh"),
        u = i("vw"),
        d = {
          ...s,
          parse: (e) => s.parse(e) / 100,
          transform: (e) => s.transform(100 * e),
        };
    },
    796: function (e, t, n) {
      "use strict";
      n.d(t, {
        HD: function () {
          return a;
        },
        KP: function () {
          return i;
        },
        Nw: function () {
          return r;
        },
        dA: function () {
          return o;
        },
        mj: function () {
          return s;
        },
      });
      let r = (e) => Math.round(1e5 * e) / 1e5,
        i = /(-)?([\d]*\.?[\d])+/g,
        o =
          /(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi,
        s =
          /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
      function a(e) {
        return "string" == typeof e;
      }
    },
    9593: function (e, t, n) {
      "use strict";
      n.d(t, {
        L: function () {
          return i;
        },
      });
      var r = n(3999);
      function i(e) {
        return !!((0, r.i)(e) && e.add);
      }
    },
    3999: function (e, t, n) {
      "use strict";
      n.d(t, {
        i: function () {
          return r;
        },
      });
      let r = (e) => !!(e && e.getVelocity);
    },
    9064: function (e, t, n) {
      "use strict";
      let r, i;
      function o(e, t) {
        return (
          t || (t = e.slice(0)),
          Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(t) } })
          )
        );
      }
      n.d(t, {
        x7: function () {
          return eC;
        },
        ZP: function () {
          return eE;
        },
      });
      var s,
        a = n(2265);
      let l = { data: "" },
        u = (e) =>
          "object" == typeof window
            ? (
                (e ? e.querySelector("#_goober") : window._goober) ||
                Object.assign(
                  (e || document.head).appendChild(
                    document.createElement("style")
                  ),
                  { innerHTML: " ", id: "_goober" }
                )
              ).firstChild
            : e || l,
        d = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,
        c = /\/\*[^]*?\*\/|  +/g,
        h = /\n+/g,
        p = (e, t) => {
          let n = "",
            r = "",
            i = "";
          for (let o in e) {
            let s = e[o];
            "@" == o[0]
              ? "i" == o[1]
                ? (n = o + " " + s + ";")
                : (r +=
                    "f" == o[1]
                      ? p(s, o)
                      : o + "{" + p(s, "k" == o[1] ? "" : t) + "}")
              : "object" == typeof s
              ? (r += p(
                  s,
                  t
                    ? t.replace(/([^,])+/g, (e) =>
                        o.replace(/(^:.*)|([^,])+/g, (t) =>
                          /&/.test(t) ? t.replace(/&/g, e) : e ? e + " " + t : t
                        )
                      )
                    : o
                ))
              : null != s &&
                ((o = /^--/.test(o)
                  ? o
                  : o.replace(/[A-Z]/g, "-$&").toLowerCase()),
                (i += p.p ? p.p(o, s) : o + ":" + s + ";"));
          }
          return n + (t && i ? t + "{" + i + "}" : i) + r;
        },
        f = {},
        m = (e) => {
          if ("object" == typeof e) {
            let t = "";
            for (let n in e) t += n + m(e[n]);
            return t;
          }
          return e;
        },
        g = (e, t, n, r, i) => {
          var o;
          let s = m(e),
            a =
              f[s] ||
              (f[s] = ((e) => {
                let t = 0,
                  n = 11;
                for (; t < e.length; ) n = (101 * n + e.charCodeAt(t++)) >>> 0;
                return "go" + n;
              })(s));
          if (!f[a]) {
            let t =
              s !== e
                ? e
                : ((e) => {
                    let t,
                      n,
                      r = [{}];
                    for (; (t = d.exec(e.replace(c, ""))); )
                      t[4]
                        ? r.shift()
                        : t[3]
                        ? ((n = t[3].replace(h, " ").trim()),
                          r.unshift((r[0][n] = r[0][n] || {})))
                        : (r[0][t[1]] = t[2].replace(h, " ").trim());
                    return r[0];
                  })(e);
            f[a] = p(i ? { ["@keyframes " + a]: t } : t, n ? "" : "." + a);
          }
          let l = n && f.g ? f.g : null;
          return (
            n && (f.g = f[a]),
            (o = f[a]),
            l
              ? (t.data = t.data.replace(l, o))
              : -1 === t.data.indexOf(o) &&
                (t.data = r ? o + t.data : t.data + o),
            a
          );
        },
        v = (e, t, n) =>
          e.reduce((e, r, i) => {
            let o = t[i];
            if (o && o.call) {
              let e = o(n),
                t = (e && e.props && e.props.className) || (/^go/.test(e) && e);
              o = t
                ? "." + t
                : e && "object" == typeof e
                ? e.props
                  ? ""
                  : p(e, "")
                : !1 === e
                ? ""
                : e;
            }
            return e + r + (null == o ? "" : o);
          }, "");
      function y(e) {
        let t = this || {},
          n = e.call ? e(t.p) : e;
        return g(
          n.unshift
            ? n.raw
              ? v(n, [].slice.call(arguments, 1), t.p)
              : n.reduce(
                  (e, n) => Object.assign(e, n && n.call ? n(t.p) : n),
                  {}
                )
            : n,
          u(t.target),
          t.g,
          t.o,
          t.k
        );
      }
      y.bind({ g: 1 });
      let _,
        b,
        x,
        w = y.bind({ k: 1 });
      function A(e, t) {
        let n = this || {};
        return function () {
          let r = arguments;
          function i(o, s) {
            let a = Object.assign({}, o),
              l = a.className || i.className;
            (n.p = Object.assign({ theme: b && b() }, a)),
              (n.o = / *go\d+/.test(l)),
              (a.className = y.apply(n, r) + (l ? " " + l : "")),
              t && (a.ref = s);
            let u = e;
            return (
              e[0] && ((u = a.as || e), delete a.as), x && u[0] && x(a), _(u, a)
            );
          }
          return t ? t(i) : i;
        };
      }
      function P() {
        let e = o([
          "\nfrom {\n  transform: scale(0) rotate(45deg);\n	opacity: 0;\n}\nto {\n transform: scale(1) rotate(45deg);\n  opacity: 1;\n}",
        ]);
        return (
          (P = function () {
            return e;
          }),
          e
        );
      }
      function T() {
        let e = o([
          "\nfrom {\n  transform: scale(0);\n  opacity: 0;\n}\nto {\n  transform: scale(1);\n  opacity: 1;\n}",
        ]);
        return (
          (T = function () {
            return e;
          }),
          e
        );
      }
      function S() {
        let e = o([
          "\nfrom {\n  transform: scale(0) rotate(90deg);\n	opacity: 0;\n}\nto {\n  transform: scale(1) rotate(90deg);\n	opacity: 1;\n}",
        ]);
        return (
          (S = function () {
            return e;
          }),
          e
        );
      }
      function k() {
        let e = o([
          "\n  width: 20px;\n  opacity: 0;\n  height: 20px;\n  border-radius: 10px;\n  background: ",
          ";\n  position: relative;\n  transform: rotate(45deg);\n\n  animation: ",
          " 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)\n    forwards;\n  animation-delay: 100ms;\n\n  &:after,\n  &:before {\n    content: '';\n    animation: ",
          " 0.15s ease-out forwards;\n    animation-delay: 150ms;\n    position: absolute;\n    border-radius: 3px;\n    opacity: 0;\n    background: ",
          ";\n    bottom: 9px;\n    left: 4px;\n    height: 2px;\n    width: 12px;\n  }\n\n  &:before {\n    animation: ",
          " 0.15s ease-out forwards;\n    animation-delay: 180ms;\n    transform: rotate(90deg);\n  }\n",
        ]);
        return (
          (k = function () {
            return e;
          }),
          e
        );
      }
      function C() {
        let e = o([
          "\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n",
        ]);
        return (
          (C = function () {
            return e;
          }),
          e
        );
      }
      function E() {
        let e = o([
          "\n  width: 12px;\n  height: 12px;\n  box-sizing: border-box;\n  border: 2px solid;\n  border-radius: 100%;\n  border-color: ",
          ";\n  border-right-color: ",
          ";\n  animation: ",
          " 1s linear infinite;\n",
        ]);
        return (
          (E = function () {
            return e;
          }),
          e
        );
      }
      function M() {
        let e = o([
          "\nfrom {\n  transform: scale(0) rotate(45deg);\n	opacity: 0;\n}\nto {\n  transform: scale(1) rotate(45deg);\n	opacity: 1;\n}",
        ]);
        return (
          (M = function () {
            return e;
          }),
          e
        );
      }
      function O() {
        let e = o([
          "\n0% {\n	height: 0;\n	width: 0;\n	opacity: 0;\n}\n40% {\n  height: 0;\n	width: 6px;\n	opacity: 1;\n}\n100% {\n  opacity: 1;\n  height: 10px;\n}",
        ]);
        return (
          (O = function () {
            return e;
          }),
          e
        );
      }
      function V() {
        let e = o([
          "\n  width: 20px;\n  opacity: 0;\n  height: 20px;\n  border-radius: 10px;\n  background: ",
          ";\n  position: relative;\n  transform: rotate(45deg);\n\n  animation: ",
          " 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)\n    forwards;\n  animation-delay: 100ms;\n  &:after {\n    content: '';\n    box-sizing: border-box;\n    animation: ",
          " 0.2s ease-out forwards;\n    opacity: 0;\n    animation-delay: 200ms;\n    position: absolute;\n    border-right: 2px solid;\n    border-bottom: 2px solid;\n    border-color: ",
          ";\n    bottom: 6px;\n    left: 6px;\n    height: 10px;\n    width: 6px;\n  }\n",
        ]);
        return (
          (V = function () {
            return e;
          }),
          e
        );
      }
      function D() {
        let e = o(["\n  position: absolute;\n"]);
        return (
          (D = function () {
            return e;
          }),
          e
        );
      }
      function j() {
        let e = o([
          "\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-width: 20px;\n  min-height: 20px;\n",
        ]);
        return (
          (j = function () {
            return e;
          }),
          e
        );
      }
      function R() {
        let e = o([
          "\nfrom {\n  transform: scale(0.6);\n  opacity: 0.4;\n}\nto {\n  transform: scale(1);\n  opacity: 1;\n}",
        ]);
        return (
          (R = function () {
            return e;
          }),
          e
        );
      }
      function L() {
        let e = o([
          "\n  position: relative;\n  transform: scale(0.6);\n  opacity: 0.4;\n  min-width: 20px;\n  animation: ",
          " 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)\n    forwards;\n",
        ]);
        return (
          (L = function () {
            return e;
          }),
          e
        );
      }
      function I() {
        let e = o([
          "\n  display: flex;\n  align-items: center;\n  background: #fff;\n  color: #363636;\n  line-height: 1.3;\n  will-change: transform;\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);\n  max-width: 350px;\n  pointer-events: auto;\n  padding: 8px 10px;\n  border-radius: 8px;\n",
        ]);
        return (
          (I = function () {
            return e;
          }),
          e
        );
      }
      function F() {
        let e = o([
          "\n  display: flex;\n  justify-content: center;\n  margin: 4px 10px;\n  color: inherit;\n  flex: 1 1 auto;\n  white-space: pre-line;\n",
        ]);
        return (
          (F = function () {
            return e;
          }),
          e
        );
      }
      function B() {
        let e = o([
          "\n  z-index: 9999;\n  > * {\n    pointer-events: auto;\n  }\n",
        ]);
        return (
          (B = function () {
            return e;
          }),
          e
        );
      }
      var N = (e) => "function" == typeof e,
        H = (e, t) => (N(e) ? e(t) : e),
        z = ((r = 0), () => (++r).toString()),
        W = () => {
          if (void 0 === i && "u" > typeof window) {
            let e = matchMedia("(prefers-reduced-motion: reduce)");
            i = !e || e.matches;
          }
          return i;
        },
        U = new Map(),
        $ = (e) => {
          if (U.has(e)) return;
          let t = setTimeout(() => {
            U.delete(e), Y({ type: 4, toastId: e });
          }, 1e3);
          U.set(e, t);
        },
        G = (e) => {
          let t = U.get(e);
          t && clearTimeout(t);
        },
        X = (e, t) => {
          switch (t.type) {
            case 0:
              return { ...e, toasts: [t.toast, ...e.toasts].slice(0, 20) };
            case 1:
              return (
                t.toast.id && G(t.toast.id),
                {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === t.toast.id ? { ...e, ...t.toast } : e
                  ),
                }
              );
            case 2:
              let { toast: n } = t;
              return e.toasts.find((e) => e.id === n.id)
                ? X(e, { type: 1, toast: n })
                : X(e, { type: 0, toast: n });
            case 3:
              let { toastId: r } = t;
              return (
                r
                  ? $(r)
                  : e.toasts.forEach((e) => {
                      $(e.id);
                    }),
                {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === r || void 0 === r ? { ...e, visible: !1 } : e
                  ),
                }
              );
            case 4:
              return void 0 === t.toastId
                ? { ...e, toasts: [] }
                : { ...e, toasts: e.toasts.filter((e) => e.id !== t.toastId) };
            case 5:
              return { ...e, pausedAt: t.time };
            case 6:
              let i = t.time - (e.pausedAt || 0);
              return {
                ...e,
                pausedAt: void 0,
                toasts: e.toasts.map((e) => ({
                  ...e,
                  pauseDuration: e.pauseDuration + i,
                })),
              };
          }
        },
        Z = [],
        q = { toasts: [], pausedAt: void 0 },
        Y = (e) => {
          (q = X(q, e)),
            Z.forEach((e) => {
              e(q);
            });
        },
        Q = {
          blank: 4e3,
          error: 4e3,
          success: 2e3,
          loading: 1 / 0,
          custom: 4e3,
        },
        K = function () {
          let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            [t, n] = (0, a.useState)(q);
          (0, a.useEffect)(
            () => (
              Z.push(n),
              () => {
                let e = Z.indexOf(n);
                e > -1 && Z.splice(e, 1);
              }
            ),
            [t]
          );
          let r = t.toasts.map((t) => {
            var n, r;
            return {
              ...e,
              ...e[t.type],
              ...t,
              duration:
                t.duration ||
                (null == (n = e[t.type]) ? void 0 : n.duration) ||
                (null == e ? void 0 : e.duration) ||
                Q[t.type],
              style: {
                ...e.style,
                ...(null == (r = e[t.type]) ? void 0 : r.style),
                ...t.style,
              },
            };
          });
          return { ...t, toasts: r };
        },
        J = function (e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "blank",
            n = arguments.length > 2 ? arguments[2] : void 0;
          return {
            createdAt: Date.now(),
            visible: !0,
            type: t,
            ariaProps: { role: "status", "aria-live": "polite" },
            message: e,
            pauseDuration: 0,
            ...n,
            id: (null == n ? void 0 : n.id) || z(),
          };
        },
        ee = (e) => (t, n) => {
          let r = J(t, e, n);
          return Y({ type: 2, toast: r }), r.id;
        },
        et = (e, t) => ee("blank")(e, t);
      (et.error = ee("error")),
        (et.success = ee("success")),
        (et.loading = ee("loading")),
        (et.custom = ee("custom")),
        (et.dismiss = (e) => {
          Y({ type: 3, toastId: e });
        }),
        (et.remove = (e) => Y({ type: 4, toastId: e })),
        (et.promise = (e, t, n) => {
          let r = et.loading(t.loading, {
            ...n,
            ...(null == n ? void 0 : n.loading),
          });
          return (
            e
              .then(
                (e) => (
                  et.success(H(t.success, e), {
                    id: r,
                    ...n,
                    ...(null == n ? void 0 : n.success),
                  }),
                  e
                )
              )
              .catch((e) => {
                et.error(H(t.error, e), {
                  id: r,
                  ...n,
                  ...(null == n ? void 0 : n.error),
                });
              }),
            e
          );
        });
      var en = (e, t) => {
          Y({ type: 1, toast: { id: e, height: t } });
        },
        er = () => {
          Y({ type: 5, time: Date.now() });
        },
        ei = (e) => {
          let { toasts: t, pausedAt: n } = K(e);
          (0, a.useEffect)(() => {
            if (n) return;
            let e = Date.now(),
              r = t.map((t) => {
                if (t.duration === 1 / 0) return;
                let n = (t.duration || 0) + t.pauseDuration - (e - t.createdAt);
                if (n < 0) {
                  t.visible && et.dismiss(t.id);
                  return;
                }
                return setTimeout(() => et.dismiss(t.id), n);
              });
            return () => {
              r.forEach((e) => e && clearTimeout(e));
            };
          }, [t, n]);
          let r = (0, a.useCallback)(() => {
              n && Y({ type: 6, time: Date.now() });
            }, [n]),
            i = (0, a.useCallback)(
              (e, n) => {
                let {
                    reverseOrder: r = !1,
                    gutter: i = 8,
                    defaultPosition: o,
                  } = n || {},
                  s = t.filter(
                    (t) => (t.position || o) === (e.position || o) && t.height
                  ),
                  a = s.findIndex((t) => t.id === e.id),
                  l = s.filter((e, t) => t < a && e.visible).length;
                return s
                  .filter((e) => e.visible)
                  .slice(...(r ? [l + 1] : [0, l]))
                  .reduce((e, t) => e + (t.height || 0) + i, 0);
              },
              [t]
            );
          return {
            toasts: t,
            handlers: {
              updateHeight: en,
              startPause: er,
              endPause: r,
              calculateOffset: i,
            },
          };
        },
        eo = w(P()),
        es = w(T()),
        ea = w(S()),
        el = A("div")(
          k(),
          (e) => e.primary || "#ff4b4b",
          eo,
          es,
          (e) => e.secondary || "#fff",
          ea
        ),
        eu = w(C()),
        ed = A("div")(
          E(),
          (e) => e.secondary || "#e0e0e0",
          (e) => e.primary || "#616161",
          eu
        ),
        ec = w(M()),
        eh = w(O()),
        ep = A("div")(
          V(),
          (e) => e.primary || "#61d345",
          ec,
          eh,
          (e) => e.secondary || "#fff"
        ),
        ef = A("div")(D()),
        em = A("div")(j()),
        eg = w(R()),
        ev = A("div")(L(), eg),
        ey = (e) => {
          let { toast: t } = e,
            { icon: n, type: r, iconTheme: i } = t;
          return void 0 !== n
            ? "string" == typeof n
              ? a.createElement(ev, null, n)
              : n
            : "blank" === r
            ? null
            : a.createElement(
                em,
                null,
                a.createElement(ed, { ...i }),
                "loading" !== r &&
                  a.createElement(
                    ef,
                    null,
                    "error" === r
                      ? a.createElement(el, { ...i })
                      : a.createElement(ep, { ...i })
                  )
              );
        },
        e_ = (e) =>
          "\n0% {transform: translate3d(0,".concat(
            -200 * e,
            "%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n"
          ),
        eb = (e) =>
          "\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,".concat(
            -150 * e,
            "%,-1px) scale(.6); opacity:0;}\n"
          ),
        ex = A("div")(I()),
        ew = A("div")(F()),
        eA = (e, t) => {
          let n = e.includes("top") ? 1 : -1,
            [r, i] = W()
              ? [
                  "0%{opacity:0;} 100%{opacity:1;}",
                  "0%{opacity:1;} 100%{opacity:0;}",
                ]
              : [e_(n), eb(n)];
          return {
            animation: t
              ? "".concat(w(r), " 0.35s cubic-bezier(.21,1.02,.73,1) forwards")
              : "".concat(w(i), " 0.4s forwards cubic-bezier(.06,.71,.55,1)"),
          };
        },
        eP = a.memo((e) => {
          let { toast: t, position: n, style: r, children: i } = e,
            o = t.height
              ? eA(t.position || n || "top-center", t.visible)
              : { opacity: 0 },
            s = a.createElement(ey, { toast: t }),
            l = a.createElement(ew, { ...t.ariaProps }, H(t.message, t));
          return a.createElement(
            ex,
            { className: t.className, style: { ...o, ...r, ...t.style } },
            "function" == typeof i
              ? i({ icon: s, message: l })
              : a.createElement(a.Fragment, null, s, l)
          );
        });
      (s = a.createElement),
        (p.p = void 0),
        (_ = s),
        (b = void 0),
        (x = void 0);
      var eT = (e) => {
          let {
              id: t,
              className: n,
              style: r,
              onHeightUpdate: i,
              children: o,
            } = e,
            s = a.useCallback(
              (e) => {
                if (e) {
                  let n = () => {
                    i(t, e.getBoundingClientRect().height);
                  };
                  n(),
                    new MutationObserver(n).observe(e, {
                      subtree: !0,
                      childList: !0,
                      characterData: !0,
                    });
                }
              },
              [t, i]
            );
          return a.createElement("div", { ref: s, className: n, style: r }, o);
        },
        eS = (e, t) => {
          let n = e.includes("top"),
            r = e.includes("center")
              ? { justifyContent: "center" }
              : e.includes("right")
              ? { justifyContent: "flex-end" }
              : {};
          return {
            left: 0,
            right: 0,
            display: "flex",
            position: "absolute",
            transition: W() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)",
            transform: "translateY(".concat(t * (n ? 1 : -1), "px)"),
            ...(n ? { top: 0 } : { bottom: 0 }),
            ...r,
          };
        },
        ek = y(B()),
        eC = (e) => {
          let {
              reverseOrder: t,
              position: n = "top-center",
              toastOptions: r,
              gutter: i,
              children: o,
              containerStyle: s,
              containerClassName: l,
            } = e,
            { toasts: u, handlers: d } = ei(r);
          return a.createElement(
            "div",
            {
              style: {
                position: "fixed",
                zIndex: 9999,
                top: 16,
                left: 16,
                right: 16,
                bottom: 16,
                pointerEvents: "none",
                ...s,
              },
              className: l,
              onMouseEnter: d.startPause,
              onMouseLeave: d.endPause,
            },
            u.map((e) => {
              let r = e.position || n,
                s = eS(
                  r,
                  d.calculateOffset(e, {
                    reverseOrder: t,
                    gutter: i,
                    defaultPosition: n,
                  })
                );
              return a.createElement(
                eT,
                {
                  id: e.id,
                  key: e.id,
                  onHeightUpdate: d.updateHeight,
                  className: e.visible ? ek : "",
                  style: s,
                },
                "custom" === e.type
                  ? H(e.message, e)
                  : o
                  ? o(e)
                  : a.createElement(eP, { toast: e, position: r })
              );
            })
          );
        },
        eE = et;
    },
    3335: function (e, t, n) {
      "use strict";
      n.d(t, {
        m6: function () {
          return L;
        },
      });
      let r = /^\[(.+)\]$/;
      function i(e, t) {
        let n = e;
        return (
          t.split("-").forEach((e) => {
            n.nextPart.has(e) ||
              n.nextPart.set(e, { nextPart: new Map(), validators: [] }),
              (n = n.nextPart.get(e));
          }),
          n
        );
      }
      let o = /\s+/;
      function s() {
        let e,
          t,
          n = 0,
          r = "";
        for (; n < arguments.length; )
          (e = arguments[n++]) &&
            (t = (function e(t) {
              let n;
              if ("string" == typeof t) return t;
              let r = "";
              for (let i = 0; i < t.length; i++)
                t[i] && (n = e(t[i])) && (r && (r += " "), (r += n));
              return r;
            })(e)) &&
            (r && (r += " "), (r += t));
        return r;
      }
      function a(e) {
        let t = (t) => t[e] || [];
        return (t.isThemeGetter = !0), t;
      }
      let l = /^\[(?:([a-z-]+):)?(.+)\]$/i,
        u = /^\d+\/\d+$/,
        d = new Set(["px", "full", "screen"]),
        c = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
        h =
          /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
        p = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
        f = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
        m =
          /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
      function g(e) {
        return y(e) || d.has(e) || u.test(e);
      }
      function v(e) {
        return O(e, "length", V);
      }
      function y(e) {
        return !!e && !Number.isNaN(Number(e));
      }
      function _(e) {
        return O(e, "number", y);
      }
      function b(e) {
        return !!e && Number.isInteger(Number(e));
      }
      function x(e) {
        return e.endsWith("%") && y(e.slice(0, -1));
      }
      function w(e) {
        return l.test(e);
      }
      function A(e) {
        return c.test(e);
      }
      let P = new Set(["length", "size", "percentage"]);
      function T(e) {
        return O(e, P, D);
      }
      function S(e) {
        return O(e, "position", D);
      }
      let k = new Set(["image", "url"]);
      function C(e) {
        return O(e, k, R);
      }
      function E(e) {
        return O(e, "", j);
      }
      function M() {
        return !0;
      }
      function O(e, t, n) {
        let r = l.exec(e);
        return (
          !!r &&
          (r[1] ? ("string" == typeof t ? r[1] === t : t.has(r[1])) : n(r[2]))
        );
      }
      function V(e) {
        return h.test(e) && !p.test(e);
      }
      function D() {
        return !1;
      }
      function j(e) {
        return f.test(e);
      }
      function R(e) {
        return m.test(e);
      }
      let L = (function (e, ...t) {
        let n, a, l;
        let u = function (o) {
          var s;
          return (
            (a = (n = {
              cache: (function (e) {
                if (e < 1) return { get: () => void 0, set: () => {} };
                let t = 0,
                  n = new Map(),
                  r = new Map();
                function i(i, o) {
                  n.set(i, o), ++t > e && ((t = 0), (r = n), (n = new Map()));
                }
                return {
                  get(e) {
                    let t = n.get(e);
                    return void 0 !== t
                      ? t
                      : void 0 !== (t = r.get(e))
                      ? (i(e, t), t)
                      : void 0;
                  },
                  set(e, t) {
                    n.has(e) ? n.set(e, t) : i(e, t);
                  },
                };
              })((s = t.reduce((e, t) => t(e), e())).cacheSize),
              splitModifiers: (function (e) {
                let t = e.separator,
                  n = 1 === t.length,
                  r = t[0],
                  i = t.length;
                return function (e) {
                  let o;
                  let s = [],
                    a = 0,
                    l = 0;
                  for (let u = 0; u < e.length; u++) {
                    let d = e[u];
                    if (0 === a) {
                      if (d === r && (n || e.slice(u, u + i) === t)) {
                        s.push(e.slice(l, u)), (l = u + i);
                        continue;
                      }
                      if ("/" === d) {
                        o = u;
                        continue;
                      }
                    }
                    "[" === d ? a++ : "]" === d && a--;
                  }
                  let u = 0 === s.length ? e : e.substring(l),
                    d = u.startsWith("!"),
                    c = d ? u.substring(1) : u;
                  return {
                    modifiers: s,
                    hasImportantModifier: d,
                    baseClassName: c,
                    maybePostfixModifierPosition: o && o > l ? o - l : void 0,
                  };
                };
              })(s),
              ...(function (e) {
                let t = (function (e) {
                    var t;
                    let { theme: n, prefix: r } = e,
                      o = { nextPart: new Map(), validators: [] };
                    return (
                      ((t = Object.entries(e.classGroups)),
                      r
                        ? t.map(([e, t]) => [
                            e,
                            t.map((e) =>
                              "string" == typeof e
                                ? r + e
                                : "object" == typeof e
                                ? Object.fromEntries(
                                    Object.entries(e).map(([e, t]) => [
                                      r + e,
                                      t,
                                    ])
                                  )
                                : e
                            ),
                          ])
                        : t).forEach(([e, t]) => {
                        (function e(t, n, r, o) {
                          t.forEach((t) => {
                            if ("string" == typeof t) {
                              ("" === t ? n : i(n, t)).classGroupId = r;
                              return;
                            }
                            if ("function" == typeof t) {
                              if (t.isThemeGetter) {
                                e(t(o), n, r, o);
                                return;
                              }
                              n.validators.push({
                                validator: t,
                                classGroupId: r,
                              });
                              return;
                            }
                            Object.entries(t).forEach(([t, s]) => {
                              e(s, i(n, t), r, o);
                            });
                          });
                        })(t, o, e, n);
                      }),
                      o
                    );
                  })(e),
                  {
                    conflictingClassGroups: n,
                    conflictingClassGroupModifiers: o,
                  } = e;
                return {
                  getClassGroupId: function (e) {
                    let n = e.split("-");
                    return (
                      "" === n[0] && 1 !== n.length && n.shift(),
                      (function e(t, n) {
                        if (0 === t.length) return n.classGroupId;
                        let r = t[0],
                          i = n.nextPart.get(r),
                          o = i ? e(t.slice(1), i) : void 0;
                        if (o) return o;
                        if (0 === n.validators.length) return;
                        let s = t.join("-");
                        return n.validators.find(({ validator: e }) => e(s))
                          ?.classGroupId;
                      })(n, t) ||
                        (function (e) {
                          if (r.test(e)) {
                            let t = r.exec(e)[1],
                              n = t?.substring(0, t.indexOf(":"));
                            if (n) return "arbitrary.." + n;
                          }
                        })(e)
                    );
                  },
                  getConflictingClassGroupIds: function (e, t) {
                    let r = n[e] || [];
                    return t && o[e] ? [...r, ...o[e]] : r;
                  },
                };
              })(s),
            }).cache.get),
            (l = n.cache.set),
            (u = d),
            d(o)
          );
        };
        function d(e) {
          let t = a(e);
          if (t) return t;
          let r = (function (e, t) {
            let {
                splitModifiers: n,
                getClassGroupId: r,
                getConflictingClassGroupIds: i,
              } = t,
              s = new Set();
            return e
              .trim()
              .split(o)
              .map((e) => {
                let {
                    modifiers: t,
                    hasImportantModifier: i,
                    baseClassName: o,
                    maybePostfixModifierPosition: s,
                  } = n(e),
                  a = r(s ? o.substring(0, s) : o),
                  l = !!s;
                if (!a) {
                  if (!s || !(a = r(o)))
                    return { isTailwindClass: !1, originalClassName: e };
                  l = !1;
                }
                let u = (function (e) {
                  if (e.length <= 1) return e;
                  let t = [],
                    n = [];
                  return (
                    e.forEach((e) => {
                      "[" === e[0]
                        ? (t.push(...n.sort(), e), (n = []))
                        : n.push(e);
                    }),
                    t.push(...n.sort()),
                    t
                  );
                })(t).join(":");
                return {
                  isTailwindClass: !0,
                  modifierId: i ? u + "!" : u,
                  classGroupId: a,
                  originalClassName: e,
                  hasPostfixModifier: l,
                };
              })
              .reverse()
              .filter((e) => {
                if (!e.isTailwindClass) return !0;
                let {
                    modifierId: t,
                    classGroupId: n,
                    hasPostfixModifier: r,
                  } = e,
                  o = t + n;
                return (
                  !s.has(o) &&
                  (s.add(o), i(n, r).forEach((e) => s.add(t + e)), !0)
                );
              })
              .reverse()
              .map((e) => e.originalClassName)
              .join(" ");
          })(e, n);
          return l(e, r), r;
        }
        return function () {
          return u(s.apply(null, arguments));
        };
      })(function () {
        let e = a("colors"),
          t = a("spacing"),
          n = a("blur"),
          r = a("brightness"),
          i = a("borderColor"),
          o = a("borderRadius"),
          s = a("borderSpacing"),
          l = a("borderWidth"),
          u = a("contrast"),
          d = a("grayscale"),
          c = a("hueRotate"),
          h = a("invert"),
          p = a("gap"),
          f = a("gradientColorStops"),
          m = a("gradientColorStopPositions"),
          P = a("inset"),
          k = a("margin"),
          O = a("opacity"),
          V = a("padding"),
          D = a("saturate"),
          j = a("scale"),
          R = a("sepia"),
          L = a("skew"),
          I = a("space"),
          F = a("translate"),
          B = () => ["auto", "contain", "none"],
          N = () => ["auto", "hidden", "clip", "visible", "scroll"],
          H = () => ["auto", w, t],
          z = () => [w, t],
          W = () => ["", g, v],
          U = () => ["auto", y, w],
          $ = () => [
            "bottom",
            "center",
            "left",
            "left-bottom",
            "left-top",
            "right",
            "right-bottom",
            "right-top",
            "top",
          ],
          G = () => ["solid", "dashed", "dotted", "double", "none"],
          X = () => [
            "normal",
            "multiply",
            "screen",
            "overlay",
            "darken",
            "lighten",
            "color-dodge",
            "color-burn",
            "hard-light",
            "soft-light",
            "difference",
            "exclusion",
            "hue",
            "saturation",
            "color",
            "luminosity",
            "plus-lighter",
          ],
          Z = () => [
            "start",
            "end",
            "center",
            "between",
            "around",
            "evenly",
            "stretch",
          ],
          q = () => ["", "0", w],
          Y = () => [
            "auto",
            "avoid",
            "all",
            "avoid-page",
            "page",
            "left",
            "right",
            "column",
          ],
          Q = () => [y, _],
          K = () => [y, w];
        return {
          cacheSize: 500,
          separator: ":",
          theme: {
            colors: [M],
            spacing: [g, v],
            blur: ["none", "", A, w],
            brightness: Q(),
            borderColor: [e],
            borderRadius: ["none", "", "full", A, w],
            borderSpacing: z(),
            borderWidth: W(),
            contrast: Q(),
            grayscale: q(),
            hueRotate: K(),
            invert: q(),
            gap: z(),
            gradientColorStops: [e],
            gradientColorStopPositions: [x, v],
            inset: H(),
            margin: H(),
            opacity: Q(),
            padding: z(),
            saturate: Q(),
            scale: Q(),
            sepia: q(),
            skew: K(),
            space: z(),
            translate: z(),
          },
          classGroups: {
            aspect: [{ aspect: ["auto", "square", "video", w] }],
            container: ["container"],
            columns: [{ columns: [A] }],
            "break-after": [{ "break-after": Y() }],
            "break-before": [{ "break-before": Y() }],
            "break-inside": [
              {
                "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"],
              },
            ],
            "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
            box: [{ box: ["border", "content"] }],
            display: [
              "block",
              "inline-block",
              "inline",
              "flex",
              "inline-flex",
              "table",
              "inline-table",
              "table-caption",
              "table-cell",
              "table-column",
              "table-column-group",
              "table-footer-group",
              "table-header-group",
              "table-row-group",
              "table-row",
              "flow-root",
              "grid",
              "inline-grid",
              "contents",
              "list-item",
              "hidden",
            ],
            float: [{ float: ["right", "left", "none", "start", "end"] }],
            clear: [
              { clear: ["left", "right", "both", "none", "start", "end"] },
            ],
            isolation: ["isolate", "isolation-auto"],
            "object-fit": [
              { object: ["contain", "cover", "fill", "none", "scale-down"] },
            ],
            "object-position": [{ object: [...$(), w] }],
            overflow: [{ overflow: N() }],
            "overflow-x": [{ "overflow-x": N() }],
            "overflow-y": [{ "overflow-y": N() }],
            overscroll: [{ overscroll: B() }],
            "overscroll-x": [{ "overscroll-x": B() }],
            "overscroll-y": [{ "overscroll-y": B() }],
            position: ["static", "fixed", "absolute", "relative", "sticky"],
            inset: [{ inset: [P] }],
            "inset-x": [{ "inset-x": [P] }],
            "inset-y": [{ "inset-y": [P] }],
            start: [{ start: [P] }],
            end: [{ end: [P] }],
            top: [{ top: [P] }],
            right: [{ right: [P] }],
            bottom: [{ bottom: [P] }],
            left: [{ left: [P] }],
            visibility: ["visible", "invisible", "collapse"],
            z: [{ z: ["auto", b, w] }],
            basis: [{ basis: H() }],
            "flex-direction": [
              { flex: ["row", "row-reverse", "col", "col-reverse"] },
            ],
            "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
            flex: [{ flex: ["1", "auto", "initial", "none", w] }],
            grow: [{ grow: q() }],
            shrink: [{ shrink: q() }],
            order: [{ order: ["first", "last", "none", b, w] }],
            "grid-cols": [{ "grid-cols": [M] }],
            "col-start-end": [{ col: ["auto", { span: ["full", b, w] }, w] }],
            "col-start": [{ "col-start": U() }],
            "col-end": [{ "col-end": U() }],
            "grid-rows": [{ "grid-rows": [M] }],
            "row-start-end": [{ row: ["auto", { span: [b, w] }, w] }],
            "row-start": [{ "row-start": U() }],
            "row-end": [{ "row-end": U() }],
            "grid-flow": [
              {
                "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"],
              },
            ],
            "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", w] }],
            "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", w] }],
            gap: [{ gap: [p] }],
            "gap-x": [{ "gap-x": [p] }],
            "gap-y": [{ "gap-y": [p] }],
            "justify-content": [{ justify: ["normal", ...Z()] }],
            "justify-items": [
              { "justify-items": ["start", "end", "center", "stretch"] },
            ],
            "justify-self": [
              { "justify-self": ["auto", "start", "end", "center", "stretch"] },
            ],
            "align-content": [{ content: ["normal", ...Z(), "baseline"] }],
            "align-items": [
              { items: ["start", "end", "center", "baseline", "stretch"] },
            ],
            "align-self": [
              {
                self: ["auto", "start", "end", "center", "stretch", "baseline"],
              },
            ],
            "place-content": [{ "place-content": [...Z(), "baseline"] }],
            "place-items": [
              {
                "place-items": [
                  "start",
                  "end",
                  "center",
                  "baseline",
                  "stretch",
                ],
              },
            ],
            "place-self": [
              { "place-self": ["auto", "start", "end", "center", "stretch"] },
            ],
            p: [{ p: [V] }],
            px: [{ px: [V] }],
            py: [{ py: [V] }],
            ps: [{ ps: [V] }],
            pe: [{ pe: [V] }],
            pt: [{ pt: [V] }],
            pr: [{ pr: [V] }],
            pb: [{ pb: [V] }],
            pl: [{ pl: [V] }],
            m: [{ m: [k] }],
            mx: [{ mx: [k] }],
            my: [{ my: [k] }],
            ms: [{ ms: [k] }],
            me: [{ me: [k] }],
            mt: [{ mt: [k] }],
            mr: [{ mr: [k] }],
            mb: [{ mb: [k] }],
            ml: [{ ml: [k] }],
            "space-x": [{ "space-x": [I] }],
            "space-x-reverse": ["space-x-reverse"],
            "space-y": [{ "space-y": [I] }],
            "space-y-reverse": ["space-y-reverse"],
            w: [
              { w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", w, t] },
            ],
            "min-w": [{ "min-w": [w, t, "min", "max", "fit"] }],
            "max-w": [
              {
                "max-w": [
                  w,
                  t,
                  "none",
                  "full",
                  "min",
                  "max",
                  "fit",
                  "prose",
                  { screen: [A] },
                  A,
                ],
              },
            ],
            h: [
              { h: [w, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] },
            ],
            "min-h": [
              { "min-h": [w, t, "min", "max", "fit", "svh", "lvh", "dvh"] },
            ],
            "max-h": [
              { "max-h": [w, t, "min", "max", "fit", "svh", "lvh", "dvh"] },
            ],
            size: [{ size: [w, t, "auto", "min", "max", "fit"] }],
            "font-size": [{ text: ["base", A, v] }],
            "font-smoothing": ["antialiased", "subpixel-antialiased"],
            "font-style": ["italic", "not-italic"],
            "font-weight": [
              {
                font: [
                  "thin",
                  "extralight",
                  "light",
                  "normal",
                  "medium",
                  "semibold",
                  "bold",
                  "extrabold",
                  "black",
                  _,
                ],
              },
            ],
            "font-family": [{ font: [M] }],
            "fvn-normal": ["normal-nums"],
            "fvn-ordinal": ["ordinal"],
            "fvn-slashed-zero": ["slashed-zero"],
            "fvn-figure": ["lining-nums", "oldstyle-nums"],
            "fvn-spacing": ["proportional-nums", "tabular-nums"],
            "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
            tracking: [
              {
                tracking: [
                  "tighter",
                  "tight",
                  "normal",
                  "wide",
                  "wider",
                  "widest",
                  w,
                ],
              },
            ],
            "line-clamp": [{ "line-clamp": ["none", y, _] }],
            leading: [
              {
                leading: [
                  "none",
                  "tight",
                  "snug",
                  "normal",
                  "relaxed",
                  "loose",
                  g,
                  w,
                ],
              },
            ],
            "list-image": [{ "list-image": ["none", w] }],
            "list-style-type": [{ list: ["none", "disc", "decimal", w] }],
            "list-style-position": [{ list: ["inside", "outside"] }],
            "placeholder-color": [{ placeholder: [e] }],
            "placeholder-opacity": [{ "placeholder-opacity": [O] }],
            "text-alignment": [
              { text: ["left", "center", "right", "justify", "start", "end"] },
            ],
            "text-color": [{ text: [e] }],
            "text-opacity": [{ "text-opacity": [O] }],
            "text-decoration": [
              "underline",
              "overline",
              "line-through",
              "no-underline",
            ],
            "text-decoration-style": [{ decoration: [...G(), "wavy"] }],
            "text-decoration-thickness": [
              { decoration: ["auto", "from-font", g, v] },
            ],
            "underline-offset": [{ "underline-offset": ["auto", g, w] }],
            "text-decoration-color": [{ decoration: [e] }],
            "text-transform": [
              "uppercase",
              "lowercase",
              "capitalize",
              "normal-case",
            ],
            "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
            "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
            indent: [{ indent: z() }],
            "vertical-align": [
              {
                align: [
                  "baseline",
                  "top",
                  "middle",
                  "bottom",
                  "text-top",
                  "text-bottom",
                  "sub",
                  "super",
                  w,
                ],
              },
            ],
            whitespace: [
              {
                whitespace: [
                  "normal",
                  "nowrap",
                  "pre",
                  "pre-line",
                  "pre-wrap",
                  "break-spaces",
                ],
              },
            ],
            break: [{ break: ["normal", "words", "all", "keep"] }],
            hyphens: [{ hyphens: ["none", "manual", "auto"] }],
            content: [{ content: ["none", w] }],
            "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
            "bg-clip": [
              { "bg-clip": ["border", "padding", "content", "text"] },
            ],
            "bg-opacity": [{ "bg-opacity": [O] }],
            "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
            "bg-position": [{ bg: [...$(), S] }],
            "bg-repeat": [
              {
                bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }],
              },
            ],
            "bg-size": [{ bg: ["auto", "cover", "contain", T] }],
            "bg-image": [
              {
                bg: [
                  "none",
                  {
                    "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"],
                  },
                  C,
                ],
              },
            ],
            "bg-color": [{ bg: [e] }],
            "gradient-from-pos": [{ from: [m] }],
            "gradient-via-pos": [{ via: [m] }],
            "gradient-to-pos": [{ to: [m] }],
            "gradient-from": [{ from: [f] }],
            "gradient-via": [{ via: [f] }],
            "gradient-to": [{ to: [f] }],
            rounded: [{ rounded: [o] }],
            "rounded-s": [{ "rounded-s": [o] }],
            "rounded-e": [{ "rounded-e": [o] }],
            "rounded-t": [{ "rounded-t": [o] }],
            "rounded-r": [{ "rounded-r": [o] }],
            "rounded-b": [{ "rounded-b": [o] }],
            "rounded-l": [{ "rounded-l": [o] }],
            "rounded-ss": [{ "rounded-ss": [o] }],
            "rounded-se": [{ "rounded-se": [o] }],
            "rounded-ee": [{ "rounded-ee": [o] }],
            "rounded-es": [{ "rounded-es": [o] }],
            "rounded-tl": [{ "rounded-tl": [o] }],
            "rounded-tr": [{ "rounded-tr": [o] }],
            "rounded-br": [{ "rounded-br": [o] }],
            "rounded-bl": [{ "rounded-bl": [o] }],
            "border-w": [{ border: [l] }],
            "border-w-x": [{ "border-x": [l] }],
            "border-w-y": [{ "border-y": [l] }],
            "border-w-s": [{ "border-s": [l] }],
            "border-w-e": [{ "border-e": [l] }],
            "border-w-t": [{ "border-t": [l] }],
            "border-w-r": [{ "border-r": [l] }],
            "border-w-b": [{ "border-b": [l] }],
            "border-w-l": [{ "border-l": [l] }],
            "border-opacity": [{ "border-opacity": [O] }],
            "border-style": [{ border: [...G(), "hidden"] }],
            "divide-x": [{ "divide-x": [l] }],
            "divide-x-reverse": ["divide-x-reverse"],
            "divide-y": [{ "divide-y": [l] }],
            "divide-y-reverse": ["divide-y-reverse"],
            "divide-opacity": [{ "divide-opacity": [O] }],
            "divide-style": [{ divide: G() }],
            "border-color": [{ border: [i] }],
            "border-color-x": [{ "border-x": [i] }],
            "border-color-y": [{ "border-y": [i] }],
            "border-color-t": [{ "border-t": [i] }],
            "border-color-r": [{ "border-r": [i] }],
            "border-color-b": [{ "border-b": [i] }],
            "border-color-l": [{ "border-l": [i] }],
            "divide-color": [{ divide: [i] }],
            "outline-style": [{ outline: ["", ...G()] }],
            "outline-offset": [{ "outline-offset": [g, w] }],
            "outline-w": [{ outline: [g, v] }],
            "outline-color": [{ outline: [e] }],
            "ring-w": [{ ring: W() }],
            "ring-w-inset": ["ring-inset"],
            "ring-color": [{ ring: [e] }],
            "ring-opacity": [{ "ring-opacity": [O] }],
            "ring-offset-w": [{ "ring-offset": [g, v] }],
            "ring-offset-color": [{ "ring-offset": [e] }],
            shadow: [{ shadow: ["", "inner", "none", A, E] }],
            "shadow-color": [{ shadow: [M] }],
            opacity: [{ opacity: [O] }],
            "mix-blend": [{ "mix-blend": X() }],
            "bg-blend": [{ "bg-blend": X() }],
            filter: [{ filter: ["", "none"] }],
            blur: [{ blur: [n] }],
            brightness: [{ brightness: [r] }],
            contrast: [{ contrast: [u] }],
            "drop-shadow": [{ "drop-shadow": ["", "none", A, w] }],
            grayscale: [{ grayscale: [d] }],
            "hue-rotate": [{ "hue-rotate": [c] }],
            invert: [{ invert: [h] }],
            saturate: [{ saturate: [D] }],
            sepia: [{ sepia: [R] }],
            "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
            "backdrop-blur": [{ "backdrop-blur": [n] }],
            "backdrop-brightness": [{ "backdrop-brightness": [r] }],
            "backdrop-contrast": [{ "backdrop-contrast": [u] }],
            "backdrop-grayscale": [{ "backdrop-grayscale": [d] }],
            "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [c] }],
            "backdrop-invert": [{ "backdrop-invert": [h] }],
            "backdrop-opacity": [{ "backdrop-opacity": [O] }],
            "backdrop-saturate": [{ "backdrop-saturate": [D] }],
            "backdrop-sepia": [{ "backdrop-sepia": [R] }],
            "border-collapse": [{ border: ["collapse", "separate"] }],
            "border-spacing": [{ "border-spacing": [s] }],
            "border-spacing-x": [{ "border-spacing-x": [s] }],
            "border-spacing-y": [{ "border-spacing-y": [s] }],
            "table-layout": [{ table: ["auto", "fixed"] }],
            caption: [{ caption: ["top", "bottom"] }],
            transition: [
              {
                transition: [
                  "none",
                  "all",
                  "",
                  "colors",
                  "opacity",
                  "shadow",
                  "transform",
                  w,
                ],
              },
            ],
            duration: [{ duration: K() }],
            ease: [{ ease: ["linear", "in", "out", "in-out", w] }],
            delay: [{ delay: K() }],
            animate: [
              { animate: ["none", "spin", "ping", "pulse", "bounce", w] },
            ],
            transform: [{ transform: ["", "gpu", "none"] }],
            scale: [{ scale: [j] }],
            "scale-x": [{ "scale-x": [j] }],
            "scale-y": [{ "scale-y": [j] }],
            rotate: [{ rotate: [b, w] }],
            "translate-x": [{ "translate-x": [F] }],
            "translate-y": [{ "translate-y": [F] }],
            "skew-x": [{ "skew-x": [L] }],
            "skew-y": [{ "skew-y": [L] }],
            "transform-origin": [
              {
                origin: [
                  "center",
                  "top",
                  "top-right",
                  "right",
                  "bottom-right",
                  "bottom",
                  "bottom-left",
                  "left",
                  "top-left",
                  w,
                ],
              },
            ],
            accent: [{ accent: ["auto", e] }],
            appearance: [{ appearance: ["none", "auto"] }],
            cursor: [
              {
                cursor: [
                  "auto",
                  "default",
                  "pointer",
                  "wait",
                  "text",
                  "move",
                  "help",
                  "not-allowed",
                  "none",
                  "context-menu",
                  "progress",
                  "cell",
                  "crosshair",
                  "vertical-text",
                  "alias",
                  "copy",
                  "no-drop",
                  "grab",
                  "grabbing",
                  "all-scroll",
                  "col-resize",
                  "row-resize",
                  "n-resize",
                  "e-resize",
                  "s-resize",
                  "w-resize",
                  "ne-resize",
                  "nw-resize",
                  "se-resize",
                  "sw-resize",
                  "ew-resize",
                  "ns-resize",
                  "nesw-resize",
                  "nwse-resize",
                  "zoom-in",
                  "zoom-out",
                  w,
                ],
              },
            ],
            "caret-color": [{ caret: [e] }],
            "pointer-events": [{ "pointer-events": ["none", "auto"] }],
            resize: [{ resize: ["none", "y", "x", ""] }],
            "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
            "scroll-m": [{ "scroll-m": z() }],
            "scroll-mx": [{ "scroll-mx": z() }],
            "scroll-my": [{ "scroll-my": z() }],
            "scroll-ms": [{ "scroll-ms": z() }],
            "scroll-me": [{ "scroll-me": z() }],
            "scroll-mt": [{ "scroll-mt": z() }],
            "scroll-mr": [{ "scroll-mr": z() }],
            "scroll-mb": [{ "scroll-mb": z() }],
            "scroll-ml": [{ "scroll-ml": z() }],
            "scroll-p": [{ "scroll-p": z() }],
            "scroll-px": [{ "scroll-px": z() }],
            "scroll-py": [{ "scroll-py": z() }],
            "scroll-ps": [{ "scroll-ps": z() }],
            "scroll-pe": [{ "scroll-pe": z() }],
            "scroll-pt": [{ "scroll-pt": z() }],
            "scroll-pr": [{ "scroll-pr": z() }],
            "scroll-pb": [{ "scroll-pb": z() }],
            "scroll-pl": [{ "scroll-pl": z() }],
            "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
            "snap-stop": [{ snap: ["normal", "always"] }],
            "snap-type": [{ snap: ["none", "x", "y", "both"] }],
            "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
            touch: [{ touch: ["auto", "none", "manipulation"] }],
            "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
            "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
            "touch-pz": ["touch-pinch-zoom"],
            select: [{ select: ["none", "text", "all", "auto"] }],
            "will-change": [
              { "will-change": ["auto", "scroll", "contents", "transform", w] },
            ],
            fill: [{ fill: [e, "none"] }],
            "stroke-w": [{ stroke: [g, v, _] }],
            stroke: [{ stroke: [e, "none"] }],
            sr: ["sr-only", "not-sr-only"],
            "forced-color-adjust": [
              { "forced-color-adjust": ["auto", "none"] },
            ],
          },
          conflictingClassGroups: {
            overflow: ["overflow-x", "overflow-y"],
            overscroll: ["overscroll-x", "overscroll-y"],
            inset: [
              "inset-x",
              "inset-y",
              "start",
              "end",
              "top",
              "right",
              "bottom",
              "left",
            ],
            "inset-x": ["right", "left"],
            "inset-y": ["top", "bottom"],
            flex: ["basis", "grow", "shrink"],
            gap: ["gap-x", "gap-y"],
            p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
            px: ["pr", "pl"],
            py: ["pt", "pb"],
            m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
            mx: ["mr", "ml"],
            my: ["mt", "mb"],
            size: ["w", "h"],
            "font-size": ["leading"],
            "fvn-normal": [
              "fvn-ordinal",
              "fvn-slashed-zero",
              "fvn-figure",
              "fvn-spacing",
              "fvn-fraction",
            ],
            "fvn-ordinal": ["fvn-normal"],
            "fvn-slashed-zero": ["fvn-normal"],
            "fvn-figure": ["fvn-normal"],
            "fvn-spacing": ["fvn-normal"],
            "fvn-fraction": ["fvn-normal"],
            "line-clamp": ["display", "overflow"],
            rounded: [
              "rounded-s",
              "rounded-e",
              "rounded-t",
              "rounded-r",
              "rounded-b",
              "rounded-l",
              "rounded-ss",
              "rounded-se",
              "rounded-ee",
              "rounded-es",
              "rounded-tl",
              "rounded-tr",
              "rounded-br",
              "rounded-bl",
            ],
            "rounded-s": ["rounded-ss", "rounded-es"],
            "rounded-e": ["rounded-se", "rounded-ee"],
            "rounded-t": ["rounded-tl", "rounded-tr"],
            "rounded-r": ["rounded-tr", "rounded-br"],
            "rounded-b": ["rounded-br", "rounded-bl"],
            "rounded-l": ["rounded-tl", "rounded-bl"],
            "border-spacing": ["border-spacing-x", "border-spacing-y"],
            "border-w": [
              "border-w-s",
              "border-w-e",
              "border-w-t",
              "border-w-r",
              "border-w-b",
              "border-w-l",
            ],
            "border-w-x": ["border-w-r", "border-w-l"],
            "border-w-y": ["border-w-t", "border-w-b"],
            "border-color": [
              "border-color-t",
              "border-color-r",
              "border-color-b",
              "border-color-l",
            ],
            "border-color-x": ["border-color-r", "border-color-l"],
            "border-color-y": ["border-color-t", "border-color-b"],
            "scroll-m": [
              "scroll-mx",
              "scroll-my",
              "scroll-ms",
              "scroll-me",
              "scroll-mt",
              "scroll-mr",
              "scroll-mb",
              "scroll-ml",
            ],
            "scroll-mx": ["scroll-mr", "scroll-ml"],
            "scroll-my": ["scroll-mt", "scroll-mb"],
            "scroll-p": [
              "scroll-px",
              "scroll-py",
              "scroll-ps",
              "scroll-pe",
              "scroll-pt",
              "scroll-pr",
              "scroll-pb",
              "scroll-pl",
            ],
            "scroll-px": ["scroll-pr", "scroll-pl"],
            "scroll-py": ["scroll-pt", "scroll-pb"],
            touch: ["touch-x", "touch-y", "touch-pz"],
            "touch-x": ["touch"],
            "touch-y": ["touch"],
            "touch-pz": ["touch"],
          },
          conflictingClassGroupModifiers: { "font-size": ["leading"] },
        };
      });
    },
  },
]);
