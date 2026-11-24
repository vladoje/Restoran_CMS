import { MojJSON } from '@/app/_lib/Interfaces';

export default function RestaurantHeader({ json }: {json:Record<string, MojJSON>}) {
  return (
    <div id="homepage-header" style={json['homepage-header'].css || {}}>
      <div className=" flex items-start justify-between">
        <div>
          <h1 id="homepage-header-naslov" style={json['homepage-header-naslov'].css || {}}>
            {json['homepage-header-naslov'].text}
          </h1>
          <p id="homepage-header-text" style={json['homepage-header-text'].css || {}}>
            {json['homepage-header-text'].text}
          </p>
          <div
            id="homepage-header-information"
            style={json['homepage-header-information'].css || {}}
          >
            <div id="homepage-header-information-address">
              {json['homepage-header-information-address'].text}
            </div>
            <div id="homepage-header-information-phone">
              {json['homepage-header-information-phone'].text}
            </div>
          </div>
        </div>
        <div className="w-32 h-32 bg-gray-200 rounded-lg shrink-0"></div>
        {/* Ovo leti kada skontam kako logo-i rade */}
      </div>
    </div>
  );
}