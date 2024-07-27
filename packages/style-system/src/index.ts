import pandaPreset from '@pandacss/preset-panda';
import type { Config } from '@pandacss/types';

import { breakpoints } from './breakpoints';
import { conditions } from './conditions';
import { globalCss } from './global-css';
import { keyframes } from './keyframes';
import { layerStyles } from './layer-styles';
import { semanticTokens } from './semantic-tokens';
import { textStyles } from './text-styles';
import { tokens } from './tokens';
import { utilities } from './utilities';

const defineConfig = <T extends Config>(config: T) => config;

export const theAssetPreset = defineConfig({
	presets: [pandaPreset],
	globalCss,
	conditions,
	utilities,
	theme: {
		extend: {
			tokens,
			semanticTokens,
			breakpoints,
			textStyles,
			keyframes,
			layerStyles
		}
	}
});

export default theAssetPreset;
