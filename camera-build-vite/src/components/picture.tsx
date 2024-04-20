import { ImageParams } from '../types/state-types';

type PictureProps = {
  previewImgWebp: string;
  previewImgWebp2x: string;
  previewImg: string;
  previewImg2x: string;
  imageParams: ImageParams;
}

export const Picture: React.FC<PictureProps> = ({
  previewImgWebp,
  previewImgWebp2x,
  previewImg,
  previewImg2x,
  imageParams
}: PictureProps) => (
  <picture>
    <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
    <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width={imageParams.width} height={imageParams.height} alt={imageParams.alt} />
  </picture>
);
