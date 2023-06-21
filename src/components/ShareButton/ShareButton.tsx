import React from 'react';
import { TelegramShareButton, WhatsappShareButton, FacebookShareButton } from 'react-share';
import { TelegramIcon, WhatsappIcon, FacebookIcon } from 'react-share';

export const ShareButton = () => {
    const shareUrl = window.location.href;
    const title = 'Заголовок статьи';
  
    const iconSize = 32;
    const isRoundIcon = false;
    const borderRadius = 10;
    const bgStyle = { fill: '#430e8a' };
    const iconFillColor = 'white';
  
    return (
      <div className="share-buttons">
        <TelegramShareButton url={shareUrl}>
          <TelegramIcon
            size={iconSize}
            round={isRoundIcon}
            borderRadius={borderRadius}
            bgStyle={bgStyle}
            iconFillColor={iconFillColor}
          />
          
        </TelegramShareButton>
  
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon
            size={iconSize}
            round={isRoundIcon}
            borderRadius={borderRadius}
            bgStyle={bgStyle}
            iconFillColor={iconFillColor}
          />
          
        </WhatsappShareButton>

        <FacebookShareButton url={shareUrl} title={title}>
          <FacebookIcon
            size={iconSize}
            round={isRoundIcon}
            borderRadius={borderRadius}
            bgStyle={bgStyle}
            iconFillColor={iconFillColor}
          />
          
        </FacebookShareButton>
      </div>
    );
  };