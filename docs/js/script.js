// タイトル一覧表示
// $.getJSON()：ブラウザのセキュリティ制限でローカルファイルが読めない
$.each(data, function(i) {
    $('#titles').append("<li id=" + data[i].id + ">" + data[i].title + "</li>");
});

// タイトルクリック ⇒ 本文表示、類似作品の一覧表示
$('#titles, #recommend')
    .click(function(e){
        var d = document_by_id(e.target.id);    // クリックした作品

        $('#main-header').text(d.title);
        show_html_text(d.url);                            // 作品表示

        $('#recommend-header').text("『"+d.title+"』に似た作品");
        $('#recommend').empty();
        var s = d.similar;                                      // 類似作品（idの配列）
        $.each(s, function(i){                              // 一覧表示
            sd = document_by_id(s[i]);
            $('#recommend').append("<li id=" + sd.id + ">" + sd.title + "</li>");
        });

        draw_som();
    })
    .mouseover(function(e){
        $(e.target).css("background-color", "#fcd1ef");
    })
    .mouseout(function(e){
        $(e.target).css("background-color", "");
    });

// 関数：指定されたidを持つ作品を検索する
function document_by_id(id){
    var docs = $.grep(data, function(d, i) {
        return (d.id == id);
    });
    return docs[0];  // 必ずひとつ見つかるものとして先頭を返す
}

// 関数：指定されたURLのHTML文書を表示する
function show_html_text(url){

    $('#main').attr("src", url);

// cross domain ajax : jquery.xdomainajax.js を使う
// 2019/4 動かなくなっていたので、iframeタグを使うことにする
//    $.get(url, function(res){
//        content = $(res.responseText);
//        $('#main').html(content);
//    });
//    $('#main').scrollTop(0);       // スクロールバーを先頭に戻す
}

// SOMのイメージ（仮）
function draw_som(){
    const WIDTH = 260;
    const HEIGHT = 260;
    var canvas = document.getElementById('canvas_som');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

//        ctx.globalAlpha = 0.5;      // 透明度 0.0 - 1.0

        var x, y;
        for(var i = 0; i < 10; i ++){
            ctx.beginPath();
            x = Math.random() * WIDTH;
            y = Math.random() * HEIGHT;
            ctx.fillStyle = '#3399FF';
            ctx.arc(x, y, 10, 0, Math.PI*2.0, true);
            ctx.fill();
        }
    }
}
