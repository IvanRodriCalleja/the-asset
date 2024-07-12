import { Link } from '@theasset/ui/next/link';
import { css } from '@theasset/style-system/css';
import { styled } from '@theasset/style-system/jsx';
import { Tool } from 'modules/home/domain/Tool';

const ToolCardContainer = styled('div', {
	base: {
		opacity: 1,
		cursor: 'pointer',
		transform: 'none',
		'& i': {
			transition: 'opacity 0.5s ease',
			opacity: 0
		},
		'&:hover': {
			'& i': {
				opacity: 1
			}
		}
	}
});

const toolCardLink = css({
	base: {
		'--border-radius': '12px',
		'--border-size': '1px',
		'--padding': '1px',
		'--border-bg':
			'conic-gradient(from 180deg at 50% 50%,#e92a67 0deg,#a853ba 112.5deg,#2a8af6 228.75deg,rgba(42,138,246,0) 360deg)',
		position: 'relative',
		overflow: 'hidden',
		fontSize: '2rem',
		padding: 'calc(1px + 1px)',
		borderRadius: '12px',
		display: 'inline-block',
		zIndex: 0,
		backfaceVisibility: 'hidden',
		perspective: 1000,
		transform: 'translateZ(0)',
		width: 'full',
		height: 'full'
	}
});

const ToolBorder = styled('i', {
	base: {
		position: 'absolute',
		top: 'var(--border-size)',
		right: 'var(--border-size)',
		bottom: 'var(--border-size)',
		left: 'var(--border-size)',
		padding: 'var(--border-size)',
		WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
		mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
		WebkitMaskComposite: 'xor',
		maskComposite: 'exclude',
		zIndex: '-1',
		borderRadius: 'calc(var(--border-radius) + var(--border-size))',

		'&:before': {
			content: '""',
			display: 'block',
			background: 'var(--border-bg)',
			boxShadow: '0 0 40px 20px --var(--border-bg)',
			width: 'calc(100%* 1.41421356237)',
			paddingBottom: 'calc(100%* 1.41421356237)',
			position: 'absolute',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			borderRadius: '100%',
			zIndex: '-2',
			animationName: 'spin',
			animationIterationCount: 'infinite',
			animationDuration: '5s',
			animationTimingFunction: 'linear'
		}
	}
});

const ToolInnerCard = styled('div', {
	base: {
		position: 'relative',
		display: 'flex',
		gap: '16px',
		height: 'full',
		width: 'full',
		maxWidth: 'full',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		borderRadius: '0.75rem',
		borderWidth: '1px',
		borderColor: 'hsla(0, 0%, 100%, .05)',
		padding: '3',
		pb: '12!',
		pt: '8',
		md: { pb: '4!', pt: '4!' },
		//background: '#fff',
		boxShadow:
			'0 0 0 1px rgba(0, 0, 0, .03), 0 2px 4px rgba(0, 0, 0, .05), 0 12px 24px rgba(0, 0, 0, .05)'
	}
});

const ToolCardHeader = styled('div', {
	base: {
		display: 'flex',
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center',
		mb: '7',
		md: { mb: '0' }
	}
});

const TooltipHeadBlur = styled('div', {
	base: {
		pointerEvents: 'none',
		pos: 'absolute',
		left: '50%',
		top: '50%',
		h: '220px',
		w: '220px',
		transform: 'translate(-50%, -50%) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1)',
		//bgImage: 'linear-gradient(rgb(255, 51, 88), rgb(255, 79, 216))',
		bgImage: 'linear-gradient(rgb(185 37 205), rgb(0 48 255))',
		opacity: '0.05',
		mixBlendMode: 'normal',
		filter: 'blur(60px)'
	}
});

const ToolCardBody = styled('div', {
	base: {
		display: 'flex',
		flex: '1',
		flexDir: 'column',
		alignItems: 'center'
	}
});

const ToolCardTitle = styled('h4', {
	base: {
		mb: '3',
		fontWeight: 'extrabold',
		textTransform: 'uppercase',
		textStyle: 'h4',
		fontStretch: 'extra-expanded'
	}
});

const ToolCardDescription = styled('p', {
	base: {
		w: '280px!',
		textAlign: 'center',
		fontFamily: 'mono',
		fontSize: 'lg',
		lineHeight: 'lg',
		opacity: '0.5'
	}
});

const ToolCardImageContainer = styled('div', {
	base: {
		height: '64px',
		width: '64px',
		borderRadius: 'full',
		boxShadow: '0 0 0 1px rgba(0, 0, 0, .03), 0 2px 4px rgba(0, 0, 0, .05)',

		'& svg': {
			height: 'full',
			width: 'full'
		}
	}
});

type ToolCardProps = {
	tool: Tool;
};

export const ToolCard = ({ tool: { icon: Icon, name, href } }: ToolCardProps) => (
	<ToolCardContainer>
		<Link className={toolCardLink} href={href} variant="none">
			<ToolBorder aria-hidden="true" />
			<ToolInnerCard>
				<ToolCardHeader>
					<TooltipHeadBlur />
					<ToolCardImageContainer>
						<Icon />
					</ToolCardImageContainer>
				</ToolCardHeader>
				<ToolCardBody>
					<ToolCardTitle>{name}</ToolCardTitle>
					<ToolCardDescription>
						The build system for JavaScript and TypeScript codebases.
					</ToolCardDescription>
				</ToolCardBody>
			</ToolInnerCard>
		</Link>
	</ToolCardContainer>
);
