// Create Countdown
var Countdown = {

    // Backbone-like structure
    $el: $('.countdown'),

    // Params
    countdown_interval: null,
    total_seconds: 0,


    // 更新する値（場所）を取得  
    init: function () {
        this.$ = {
            days: this.$el.find('.bloc-time.days .figure'),
            hours: this.$el.find('.bloc-time.hours .figure'),
            minutes: this.$el.find('.bloc-time.min .figure'),
            seconds: this.$el.find('.bloc-time.sec .figure')
        };

        // カウントダウンの値の初期化
        let endDateTime = new Date("2021/12/01 12:11:00"); // 期日
        let startDateTime = new Date(); // 時間を取得
        let remaining = endDateTime - startDateTime; // 残り時間
        let daySeconds = 24 * 60 * 60 * 1000;

        // 残り日数
        let remainingDays = Math.floor(remaining / daySeconds);
        // $('h1').html(remainingDays);

        // 残り時間
        let remainingHrs = Math.floor((remaining % daySeconds) / (60 * 60 * 1000));
        console.log(remainingHrs);

        // 残り分数
        let remainingMin = Math.floor((remaining % daySeconds) / (60 * 1000)) % 60;

        // 残り秒数
        let remainingSec = Math.floor((remaining % daySeconds) / 1000) % 60 % 60;

        // 時間を初期化    
        this.values = {
            days: remainingDays,
            hours: remainingHrs || this.$.hours.parent().attr('data-init-value'),
            minutes: remainingMin || this.$.minutes.parent().attr('data-init-value'),
            seconds: remainingSec || this.$.seconds.parent().attr('data-init-value'),
        };

        // 秒数を初期化
        this.total_seconds = this.values.hours * 60 * 60 + (this.values.minutes * 60) + this.values.seconds;

        // カウントダウンを開始
        this.count();
    },


    count: function () {

        var that = this,　// $el countdown
            $days_1 = this.$.days.eq(0),
            $days_2 = this.$.days.eq(1),
            $days_3 = this.$.days.eq(2),
            $hour_1 = this.$.hours.eq(0),
            $hour_2 = this.$.hours.eq(1),
            $min_1 = this.$.minutes.eq(0),
            $min_2 = this.$.minutes.eq(1),
            $sec_1 = this.$.seconds.eq(0),
            $sec_2 = this.$.seconds.eq(1);

        console.log($days_1);
        console.log($days_2);
        console.log($days_3);

        this.countdown_interval = setInterval(function () {

            if (that.total_seconds > 0) {
                --that.values.seconds;

                if (that.values.minutes >= 0 && that.values.seconds < 0) {
                    that.values.seconds = 59;
                    --that.values.minutes;
                }


                if (that.values.hours >= 0 && that.values.minutes < 0) {
                    that.values.minutes = 59;
                    --that.values.hours;
                }

                // Update DOM values
                // Days
                that.checkHour(that.values.days, $days_1, $days_2, $days_3)

                // Hours
                that.checkHour(that.values.hours, $hour_1, $hour_2);

                // Minutes
                that.checkHour(that.values.minutes, $min_1, $min_2);

                // Seconds
                that.checkHour(that.values.seconds, $sec_1, $sec_2);

                --that.total_seconds;
            }
            else {
                clearInterval(that.countdown_interval);
            }
        }, 1000);
    },

    animateFigure: function ($el, value) {

        var that = this,
            $top = $el.find('.top'),
            $bottom = $el.find('.bottom'),
            $back_top = $el.find('.top-back'),
            $back_bottom = $el.find('.bottom-back');

        // Before we begin, change the back value
        $back_top.find('span').html(value);

        // Also change the back bottom value
        $back_bottom.find('span').html(value);



        // Then animate
        TweenMax.to($top, 0.8, {
            rotationX: '-180deg',
            transformPerspective: 300,
            ease: Quart.easeOut,
            onComplete: function () {

                $top.html(value);
                $bottom.html(value);
                TweenMax.set($top, { rotationX: 0 });
            }
        });

        TweenMax.to($back_top, 0.8, {
            rotationX: 0,
            transformPerspective: 300,
            ease: Quart.easeOut,
            clearProps: 'all'
        });
    },

    checkHour: function (value, $el_1, $el_2, $el_3) {

        var val_1 = value.toString().charAt(0),
            val_2 = value.toString().charAt(1),
            val_3 = value.toString().charAt(2),
            fig_1_value = $el_1.find('.top').html(),
            fig_2_value = $el_2.find('.top').html();
        // var fig_3_value = ($el_3) ? $el_3.find('.top').html() : undefined;
        // console.log(val_1);
        //   console.log(val_2);
        //   console.log(fig_1_value);
        //   console.log(fig_2_value);

        if (value >= 10) {

            // figureが変わったときのみ以下の処理を実行
            if (fig_1_value !== val_1) this.animateFigure($el_1, val_1);
            if (fig_2_value !== val_2) this.animateFigure($el_2, val_2);
            // if ($el_3) {
            //     if (fig_3_value !== val_3) this.animateFigure($el_3, val_3);
            // }
        }
        else {

            // 10未満のとき, figureのwithを0にする
            if (fig_1_value !== '0') this.animateFigure($el_1, 0);
            if (fig_2_value !== val_1) this.animateFigure($el_2, val_1);
        }
    }
};

// カウントダウン処理実行
Countdown.init();
