import { Renderer2, Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PageService } from '../page.service';
import { ConfigService } from '../../app.config';
import { UtilsService } from '../../utils/app.utils';

@Component({
  selector: '.wall_page',
  templateUrl: './wall.component.html'
})
export class WallComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private pageService: PageService,
    private config: ConfigService,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit() {

    this.config.broadcaster.on(this.config.main_channel)
      .subscribe(
        response => {
          const token = localStorage.getItem('_token');
          switch (response.type) {
            case 'update_wall':
              // fulfilled. but not the fact that it is read
              if (response.token !== token && response.page_id === this.pageService.page_id) {
                this.gen_im_message_wrap(response, '.im_message_history_wrap', 1);
              }
              break;
          }
        }
      );

  }

  send_to_wall(form: NgForm, event): void {

    if (event) {
      if (event.keyCode !== 13 || event.shiftKey) {
        return;
      }
    }

    const div_textarea = this.el.nativeElement.querySelector('.composer_rich_textarea'),
          msg = div_textarea.textContent;
    if (msg !== '') {
      const dt = Date.now();
      const action = 'send_to_wall';
      const data = {
        room: this.pageService.page_id,
        message: {
          text: msg,
          date: dt,
          author: localStorage.getItem('_guid'),
          photo: 'http://3.bp.blogspot.com/_yzU-EquWSV4/S6u8WV0N6WI/AAAAAAAAAHY/ruyngvr9YP0/s200/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA2.PNG'
        }
      };
      div_textarea.textContent = '';
      this.pageService.send(action, data)
        .then(
          () => {
            this.gen_im_message_wrap(data, '.im_message_history_wrap', 1);
          }
        )
        .catch(
          () => {
            // TODO:: to think over common service
            this.config.unsent_messages.insert([{action: action, data: JSON.stringify(data)}]);
            this.gen_im_message_wrap(data, '.im_message_history_wrap', 1);
          }
        );
    }

  }

  gen_im_message_wrap(data, selector, type): void {

    data.message.text = this.renderer.createText(data.message.text);
    data.message.date = this.renderer.createText(UtilsService.date_time_format(data.message.date));
    data.message.author = this.renderer.createText(data.message.author);

    const im_message_wrap = this.renderer.createElement('div'),
          im_content_message_wrap = this.renderer.createElement('div'),
          im_message_from_photo = this.renderer.createElement('div'),
          m_photo = this.renderer.createElement('img'),
          im_message_meta = this.renderer.createElement('div'),
          im_message_date = this.renderer.createElement('div'),
          im_message_body = this.renderer.createElement('div'),
          im_message_author_wrap = this.renderer.createElement('span'),
          im_message_author = this.renderer.createElement('a'),
          im_message = this.renderer.createElement('div'),
          im_message_text = this.renderer.createElement('div');

    this.renderer.addClass(im_message_wrap, 'im_message_wrap');
    this.renderer.addClass(im_content_message_wrap, 'im_content_message_wrap');
    this.renderer.addClass(im_message_from_photo, 'im_message_from_photo');
    this.renderer.addClass(im_message_from_photo, 'pull_left');
    this.renderer.addClass(im_message_meta, 'im_message_meta');
    this.renderer.addClass(im_message_meta, 'pull_right');
    this.renderer.addClass(im_message_date, 'im_message_date');
    this.renderer.addClass(im_message_body, 'im_message_body');
    this.renderer.addClass(im_message_author_wrap, 'im_message_author_wrap');
    this.renderer.addClass(im_message_author, 'im_message_author');
    this.renderer.addClass(im_message, 'im_message');
    this.renderer.addClass(im_message_text, 'im_message_text');

    this.renderer.appendChild(im_message_wrap, im_content_message_wrap);

    this.renderer.setAttribute(m_photo, 'src', data.message.photo);
    this.renderer.appendChild(im_message_from_photo, m_photo);
    this.renderer.appendChild(im_content_message_wrap, im_message_from_photo);

    this.renderer.appendChild(im_message_date, data.message.date);
    this.renderer.appendChild(im_message_meta, im_message_date);
    this.renderer.appendChild(im_content_message_wrap, im_message_meta);

    this.renderer.appendChild(im_message_author, data.message.author);
    this.renderer.listen(im_message_author, 'click', (event) => {
      this.pageService.transition_to_wall(data.message.author.textContent)
        .then(
          () => {
            // TODO:: reloading modules relative to guid
          }
        );
    });
    this.renderer.appendChild(im_message_author_wrap, im_message_author);
    this.renderer.appendChild(im_message_body, im_message_author_wrap);

    this.renderer.appendChild(im_message_text, data.message.text);
    this.renderer.appendChild(im_message, im_message_text);
    this.renderer.appendChild(im_message_body, im_message);

    this.renderer.appendChild(im_content_message_wrap, im_message_body);

    const im_message_history_wrap = this.el.nativeElement.querySelector(selector);

    if (im_message_history_wrap.children.length > 0) {
      this.renderer.insertBefore(im_message_history_wrap, im_message_wrap, im_message_history_wrap.children[0]);
    }else {
      this.renderer.appendChild(im_message_history_wrap, im_message_wrap);
    }

  }

}
