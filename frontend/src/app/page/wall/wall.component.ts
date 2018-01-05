import { Renderer2, Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PageService } from '../page.service';
import { ConfigService } from '../../app.config';

@Component({
  selector: '.wall_page',
  templateUrl: './wall.component.html'
})
export class WallComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private pageService: PageService,
    private config: ConfigService
  ) {}
  ngOnInit() {

    this.config.broadcaster.on(this.config.main_channel)
      .subscribe(
        response => {
          switch (response.type) {
            case 'update_wall':
              console.log(response.message);
              this.gen_im_message_wrap(response, '.im_message_history_wrap', 1);
              break;
          }
        }
      );

  }

  send_to_wall(form: NgForm): void {

    const msg = this.el.nativeElement.querySelector('.composer_rich_textarea').textContent;
    if (msg !== '') {
      const dt = Date.now();
      const data = {
        room: this.pageService.page_id,
        message: {
          text: msg,
          date: dt,
          author: 'Max',
          photo: 'http://3.bp.blogspot.com/_yzU-EquWSV4/S6u8WV0N6WI/AAAAAAAAAHY/ruyngvr9YP0/s200/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA2.PNG'
        }
      };
      this.pageService.send_to_wall(data);

    }

  }

  gen_im_message_wrap(data, selector, type): void {

    data.message.text = this.renderer.createText(data.message.text);
    data.message.date = this.renderer.createText(new Date(parseInt(data.message.date.toString(), 10)).toString());
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
    this.renderer.appendChild(im_message_author_wrap, im_message_author);
    this.renderer.appendChild(im_message_body, im_message_author_wrap);

    this.renderer.appendChild(im_message_text, data.message.text);
    this.renderer.appendChild(im_message, im_message_text);
    this.renderer.appendChild(im_message_body, im_message);

    this.renderer.appendChild(im_content_message_wrap, im_message_body);

    const im_message_history_wrap = this.el.nativeElement.querySelector(selector);

    this.renderer.appendChild(im_message_history_wrap, im_message_wrap);

  }

}
