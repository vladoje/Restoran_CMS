import { CSSProperties } from 'react';
import { FaEnvelope, FaRegCircleDot } from 'react-icons/fa6';
import { MojJSON } from '@/app/_lib/Interfaces';

export   function PrivacyHeader({
  restaurantName,
  json,
  isEditing,
}: {
  restaurantName: string;
  json: Record<string, MojJSON>;
  isEditing?: boolean;
}) {
  return (
    <div style={json['privacy-header']?.css || {}}>
      <h1 style={json['privacy-header-naslov']?.css || {}}>
        {json['privacy-header-naslov']?.text}
      </h1>
      <p style={json['privacy-header-paragraf']?.css || {}}>
        {json['privacy-header-paragraf']?.text}{' '}
        <span className="font-semibold text-slate-900">{restaurantName}</span>
      </p>
    </div>
  );
}
export   function PrivacySection({
  title,
  bodyText,
  titleStyle,
  bodyStyle,
  sectionStyle,
  headerStyle,
  circleStyle,
  isEditing,
}: {
  title?: string;
  bodyText?: string;
  titleStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  sectionStyle?: CSSProperties;
  headerStyle?: CSSProperties;
  circleStyle?: CSSProperties;
  isEditing?: boolean;
}) {
  return (
    <section style={sectionStyle || {}}>
      <div style={headerStyle || {}}>
        <FaRegCircleDot style={circleStyle || {}} />
        <h2 style={titleStyle || {}}>{title}</h2>
      </div>
      <p style={bodyStyle || {}}>{bodyText}</p>
    </section>
  );
}

export  function PrivacyContactInfo({
  restaurantEmail,
  json,
  isEditing,
}: {
  restaurantEmail: string;
  json: Record<string, MojJSON>;
  isEditing?: boolean;
}) {
  return (
    <div style={json['privacy-info']?.css || {}}>
      <FaEnvelope style={json['privacy-info-koverta']?.css || {}} />
      <div style={json['privacy-info-div']?.css || {}}>
        <p>
          {json['privacy-info-div-paragraf']?.text}{' '}
          <span style={json['privacy-info-div-paragraf-span']?.css || {}}>
            {json['privacy-info-div-paragraf-span']?.text}
          </span>
        </p>
        <p>
          {json['privacy-info-div-paragraf2']?.text}{' '}
          <a
            href={`mailto:${restaurantEmail}`}
            style={json['privacy-info-div-paragraf2-anchor']?.css || {}}
          >
            {json['privacy-info-div-paragraf2-anchor']?.text}
          </a>
        </p>
      </div>
    </div>
  );
}
