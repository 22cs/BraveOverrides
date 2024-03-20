(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    [15],
    {
        b673: function(t, i, e)
        {
            "use strict";
            e.r(i);
            var s = function()
                {
                    var t = this,
                        i = t._self._c;
                    return i("div",
                    {
                        staticStyle:
                        {
                            width: "1px",
                            height: "1px",
                            overflow: "hidden",
                            top: "0",
                            left: "0",
                            position: "absolute"
                        }
                    }, [i("canvas",
                    {
                        staticStyle:
                        {
                            display: "none"
                        },
                        attrs:
                        {
                            id: "canvas"
                        }
                    }), i("video",
                    {
                        staticStyle:
                        {
                            display: "inline"
                        },
                        attrs:
                        {
                            id: "video",
                            muted: "",
                            playsinline: "",
                            controls: ""
                        },
                        domProps:
                        {
                            muted: !0
                        }
                    })])
                },
                o = [],
                h = (e("498a"), e("02c5")),
                n = e("1c16"),
                r = e("dfcc"),
                a = {
                    name: "PiPSubtitle",
                    props:
                    {},
                    data()
                    {
                        return {
                            canvas: null,
                            video: null,
                            pipWindow: null,
                            currentPiPStatus: !1,
                            lastProcessedWindowSize:
                            {
                                height: 0,
                                width: 0
                            },
                            resizePatchTimeoutID: null
                        }
                    },
                    computed:
                    {},
                    watch:
                    {
                        "$store.state.AudioPlayer.playing": Object(n["a"])((function(t)
                        {
                            this.currentPiPStatus && (t ? this.video.play() : t || this.video
                                .pause())
                        }), 10),
                        "$store.state.AudioPlayer.subtitleDisplayMode"(t)
                        {
                            "pip" !== t || this.currentPiPStatus ? "pip" !== t && this.currentPiPStatus &&
                                this.hide() : this.show()
                        },
                        "$store.state.AudioPlayer.currentLyric"(t)
                        {
                            this.setSubtitle(t), this.video.srcObject.getTracks().forEach((t => t
                                .requestFrame()))
                        }
                    },
                    mounted()
                    {
                        this.canvas = document.querySelector("#canvas"), this.video = document
                            .querySelector("#video"), this.video.addEventListener("pause", (() =>
                            {
                                this.$store.commit("AudioPlayer/WANT_PAUSE")
                            }), !0), this.video.addEventListener("play", (() =>
                            {
                                this.$store.commit("AudioPlayer/WANT_PLAY")
                            }), !0), this.canvas.width = Math.round( window.innerWidth), this.canvas
                            .height = Math.round(this.canvas.width / 2.5), this.setSubtitle(""), this
                            .video.srcObject = this.canvas.captureStream(0), addEventListener(
                                "enterpictureinpicture", (t =>
                                {
                                    this.currentPiPStatus = !0, this.$store.commit(
                                            "AudioPlayer/SET_SUBTITLE_DISPLAY_MODE", "pip"), this
                                        .pipWindow = t.pictureInPictureWindow, this.pipWindow.onresize =
                                        this.onPipWindowResize.bind(this), this.onPipWindowResize()
                                }), !1), addEventListener("leavepictureinpicture", (() =>
                            {
                                this.currentPiPStatus = !1, this.$store.commit(
                                        "AudioPlayer/SET_SUBTITLE_DISPLAY_MODE", "in-app"), this
                                    .pipWindow.onresize = null
                            }), !1)
                    },
                    methods:
                    {
                        onPipWindowResize()
                        {
                            Math.abs(this.lastProcessedWindowSize.height - this.pipWindow.height) < 10 &&
                                Math.abs(this.lastProcessedWindowSize.width - this.pipWindow.width) < 10 ||
                                (this.lastProcessedWindowSize = {
                                    height: this.pipWindow.height,
                                    width: this.pipWindow.width
                                }, 17 === Object(r["a"])(navigator.userAgent)[0] ? (this.canvas.width =
                                    Math.round(.8 * this.pipWindow.width), this.canvas.height = Math
                                    .round(.8 * this.pipWindow.height), this.setSubtitle(this.$store
                                        .state.AudioPlayer.currentLyric), this.video.srcObject
                                    .getTracks().forEach((t => t.requestFrame())), this
                                    .resizePatchTimeoutID && clearTimeout(this.resizePatchTimeoutID),
                                    this.resizePatchTimeoutID = setTimeout((() =>
                                    {
                                        this.canvas.width = Math.round(1 * this.pipWindow
                                            .width), this.canvas.height = Math.round(1 * this
                                                .pipWindow.height), this.setSubtitle(this.$store
                                                .state.AudioPlayer.currentLyric), this.video
                                            .srcObject.getTracks().forEach((t => t
                                            .requestFrame()))
                                    }), 500)) : (this.canvas.width = Math.round(1 * this.pipWindow
                                    .width), this.canvas.height = Math.round(1 * this.pipWindow
                                    .height), this.setSubtitle(this.$store.state.AudioPlayer
                                    .currentLyric), this.video.srcObject.getTracks().forEach((t => t
                                    .requestFrame()))))
                        },
                        show()
                        {
                            this.currentPiPStatus || (this.video.play(), "function" === typeof this.video
                                .requestPictureInPicture ? this.video.requestPictureInPicture().catch((
                                    t =>
                                    {
                                        this.video.pause(), this.$store.commit(
                                                "AudioPlayer/SET_SUBTITLE_DISPLAY_MODE", "in-app"),
                                            h["c"](t)
                                    })) : "webkitSetPresentationMode" in this.video && "function" ===
                                typeof this.video.webkitSetPresentationMode && this.video
                                .webkitSetPresentationMode("picture-in-picture"))
                        },
                        hide()
                        {
                            this.currentPiPStatus && (this.video.pause(), "function" === typeof document
                                .exitPictureInPicture ? document.exitPictureInPicture() :
                                "webkitSetPresentationMode" in this.video && "function" === typeof this
                                .video.webkitSetPresentationMode && this.video
                                .webkitSetPresentationMode("inline"))
                        },
                        setSubtitle(t)
                        {
                            t = t.trim();
                            const i = this.canvas,
                                e = i.getContext("2d"),
                                s = this.canvas.width / 15;
                            if (e.clearRect(0, 0, i.width, i.height), e.fillStyle = this.$q.dark.isActive ?
                                "rgb(0, 0, 0)" : "rgb(255, 255, 255)", e.fillRect(0, 0, i.width, i.height),
                                e.font =
                                `bold ${s}px "-apple-system", "BlinkMacSystemFont", "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", "Helvetica", "Arial", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
                                e.fillStyle = this.$q.dark.isActive ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",
                                t.length <= 14)
                            {
                                const o = e.measureText(t).width,
                                    h = (i.width - o) / 2,
                                    n = (i.height - s) / 2.2 + s;
                                e.fillText(t, h, n)
                            }
                            else
                            {
                                let o = e.measureText(t.slice(0, 14)).width,
                                    h = (i.width - o) / 2,
                                    n = (i.height - s) / 1.6;
                                e.fillText(t.slice(0, 14), h, n), o = e.measureText(t.slice(14)).width, h =
                                    (i.width - o) / 2, n += s + .15 * s, e.fillText(t.slice(14), h, n)
                            }
                        }
                    }
                },
                d = a,
                c = e("2877"),
                u = Object(c["a"])(d, s, o, !1, null, "3fdae216", null);
            i["default"] = u.exports
        }
    }
]);