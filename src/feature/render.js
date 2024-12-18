import { Vault } from 'src/vault';
import { getArticleId } from 'src/utils/url';
import { renderInit } from 'src/init/renderInit';

const v = new Vault();

function render(url) {
  window.history.pushState(null, null, url);

  v.setLastArticle(getArticleId(url));

  const html = v.getHtml(url);

  if (html == undefined) {
    fetch(url)
      .then((res) => res.text())
      .then(renderCallback)
      .then(renderInit);
  } else {
    new Promise((res) => res(renderCallback(html))).then(renderInit);
  }
}

function renderCallback(html) {
  const dom = $(html);

  $('.article-wrapper').toggle(dom.find('.article-wrapper').length > 0);

  $('title').html(dom.find('meta[name=title]').attr('content'));
  $('.article-wrapper').html(dom.find('.article-wrapper').html());

  $('.article-list').html(dom.find('.article-list').html());

  $('.board-article-list .pagination-wrapper').html(
    dom.find('.board-article-list .pagination-wrapper').html() ||
      dom.find('.included-article-list .pagination-wrapper').html(),
  );

  $('.included-article-list .pagination-wrapper').html(
    dom.find('.board-article-list .pagination-wrapper').html() ||
      dom.find('.included-article-list .pagination-wrapper').html(),
  );

  $('a.vrow.column, a.page-link, .board-category a, .btns-board a').on(
    'click',
    function (e) {
      e.preventDefault();
      const href = $(this).attr('href');

      new Vault().setLastArticle(getArticleId(href), true);
      render(href);
    },
  );

  $('video.arca-emoticon')
    .get()
    .forEach((ele) => ele.play());

  const videos = $('video.emoticon').get();

  new Promise(function (resolve) {
    var loaded = 0;

    videos.forEach(function (v) {
      v.addEventListener('loadedmetadata', function () {
        loaded++;

        v.pause();

        if (loaded === videos.length) {
          resolve();
        }
      });
    });
  }).then(function () {
    videos.forEach(function (v) {
      v.play();
    });
  });

  $('html, body').animate({ scrollTop: 0 }, 200);
}

export { render };
