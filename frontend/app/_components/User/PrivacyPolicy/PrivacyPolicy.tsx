import NewUserDashboard from '@/app/_components/NewUserDashboard';
import { getRestoranWithSlug } from '@/app/_lib/getRestoran';
import {  Restoran } from '@/app/_lib/Interfaces';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import createGlobalStylesObject from '@/app/_lib/CMS/createGlobalStylesObject';
import { getSite } from '@/app/_lib/getSite';
import { _json, getDefaultGlobalStyles, convertJSON } from '@/app/[restaurantSlug]/(user)/_json';
import {
  PrivacyContactInfo,
  PrivacyHeader,
  PrivacySection,
} from '@/app/_components/User/PrivacyPolicy/PrivacyHelpers';


export async function PrivacyPolicy({
  slug,
  isEditing = false,
}: {
  slug: string;
  isEditing?: boolean;
}) {
  const session = await getServerSession(options);
  if (!session?.user) return <NewUserDashboard restaurantSlug={slug} />;

  const restoran: Restoran = await getRestoranWithSlug(slug);
  const site = await getSite(restoran.siteId);
  const globalStyles = createGlobalStylesObject(site) || getDefaultGlobalStyles();
  const json = convertJSON(site.jsonCSS || _json(restoran), globalStyles);

  return (
    <div style={json['privacy']?.css || {}}>
      {/* HEADER */}
      <PrivacyHeader restaurantName={restoran.name} json={json} isEditing={isEditing} />

      {/* SADRŽAJ DOKUMENTA */}
      <div style={json['privacy-body']?.css || {}}>
        {/* Sekcija 1 */}
        <PrivacySection
          title={json['privacy-body-section-header-naslov']?.text}
          bodyText={json['privacy-body-section-body']?.text}
          sectionStyle={json['privacy-body-section']?.css}
          headerStyle={json['privacy-body-section-header']?.css}
          circleStyle={json['privacy-body-section-header-circle']?.css}
          titleStyle={json['privacy-body-section-header-naslov']?.css}
          bodyStyle={json['privacy-body-section-body']?.css}
          isEditing={isEditing}
        />

        {/* Sekcija 2 */}
        <PrivacySection
          title={json['privacy-body-section-header-naslov2']?.text}
          bodyText={json['privacy-body-section-body2']?.text}
          sectionStyle={json['privacy-body-section']?.css}
          headerStyle={json['privacy-body-section-header']?.css}
          circleStyle={json['privacy-body-section-header-circle']?.css}
          titleStyle={json['privacy-body-section-header-naslov2']?.css}
          bodyStyle={json['privacy-body-section-body2']?.css}
          isEditing={isEditing}
        />

        {/* INFO BOX / KONTAKT */}
        <PrivacyContactInfo restaurantEmail={restoran.email} json={json} isEditing={isEditing} />
      </div>

      {/* FOOTER */}
      <p style={json['privacy-footer']?.css || {}}>{json['privacy-footer']?.text}</p>
    </div>
  );
}

export default PrivacyPolicy;
