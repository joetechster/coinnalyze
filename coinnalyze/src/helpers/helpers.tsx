import {LightText} from '../components/Text';
import {Theme, onBackground, primary} from '../globals';

export function formatPrice(
  price?: number | null,
  sigfig: number = 0,
  prefix = true,
) {
  return (
    prefix &&
    '$' + price?.toLocaleString('en-US', {maximumFractionDigits: sigfig})
  );
}

export function formatPercent(
  theme: Theme,
  percent?: number | null,
  sigfig = 2,
) {
  const color = percent
    ? percent < 0
      ? 'red'
      : primary(theme)
    : onBackground(theme);
  if (percent !== null && percent !== undefined) {
    return (
      <LightText style={{color}}>
        {(percent > 0 ? '+' : '') + percent.toFixed(sigfig) + '%'}
      </LightText>
    );
  }
}
