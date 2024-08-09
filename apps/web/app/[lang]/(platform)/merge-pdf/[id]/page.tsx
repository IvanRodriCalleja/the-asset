'use client';

import { Suspense } from 'react';

import { redirect } from 'next/navigation';

import {
	ArrowLeftIcon,
	CheckCircledIcon,
	ChevronRightIcon,
	CrumpledPaperIcon,
	DownloadIcon
} from '@radix-ui/react-icons';

import { cacheStore } from '@theasset/cache/store';
import { useLocale } from '@theasset/internationalization/hooks';
import { ScrollViewer } from '@theasset/pdf-react/scroll-viewer';
import { css } from '@theasset/style-system/css';
import { Box, Flex, Stack, styled } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { Text } from '@theasset/ui/text';
import { replaceParams } from '@theasset/ui/utils/replaceParams';

import { MergePdfResult } from 'modules/pdf/MergePdfResult';
import { MergeResultFile } from 'modules/pdf/domain/MergeResultFile';
import { mergePdfPath } from 'routes';

// TODO: Add isomorphic redirect

type MergeResultProps = {
	params: {
		id: string;
	};
};

const MergePdfResultPage = ({ params }: MergeResultProps) => {
	const resultFile = cacheStore.getResult<MergeResultFile>(params.id);

	if (!resultFile) {
		redirect(replaceParams(mergePdfPath, params));
	}

	return <MergePdfResult file={resultFile} />;
};

export default MergePdfResultPage;

/*const MergeResult = ({ params }: MergeResultProps) => {
	const buffer = cacheStore.getResult<ArrayBuffer>(params.id);

	if (!buffer) {
		redirect(replaceParams(mergePdfPath, params));
	}

	return (
		<section style={{ width: '100%', height: 'calc(100vh - 63px)' }}>
			<Flex direction="row" height="100%">


				<Box
					display="flex"
					flex={1}
					justifyContent="center"
					height="100%"
					overflow="auto"
					padding={16}>
					<Suspense fallback={<div>Loading</div>}>
						<ScrollViewer hash={params.id} buffer={buffer} />
					</Suspense>
				</Box>
				<Box
					display="flex"
					padding={16}
					borderLeftStyle="solid"
					borderLeftWidth="1px"
					borderLeftColor="border"
					width={{
						base: 'full',
						md: '480px'
					}}>
					<ConfigMerge />
				</Box>
			</Flex>
		</section>
	);
};

export default MergeResult;

// TODO: ADD LITERALS

const Checked = styled(CheckCircledIcon, {
	base: {
		width: '24px',
		height: '24px'
	}
});

const ConfigMerge = () => {
	const { mergePdfResult } = useLocale();

	return (
		<Stack display="flex">
			<Stack flex={1} overflow="auto">
				<Stack gap={8}>
					<Stack gap={1}>
						<h3>
							<b style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
								<Checked />
								<Text size="2xl">{mergePdfResult.successfullyMergedTitle}</Text>
							</b>
						</h3>

						<Text size="sm" color="textClear" family="mono">
							{mergePdfResult.successfullyMergedDescription}
						</Text>
					</Stack>

					<Stack gap={2}>
						<Stack direction="row" gap={0}>
							<Text
								size="md"
								weight="bold"
								className={css({
									borderBottomStyle: 'dashed',
									borderBottomWidth: '1px',
									borderBottomColor: 'black'
								})}>
								tema1-merged
							</Text>
							<Text size="md" color="textClear">
								.pdf
							</Text>
						</Stack>
						<Text size="sm" color="textClear" family="mono">
							1.2MB - 200 pages
						</Text>
					</Stack>

					<Stack>
						<h3>
							<b>
								<Text size="md">Continue with</Text>
							</b>
						</h3>

						<ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
							{[...new Array(5)].map((_, index) => (
								<li key={index}>
									<Flex direction="column">
										<Button variant="secondary">
											<Stack
												width="100%"
												direction="row"
												justifyContent="space-between"
												alignItems="center">
												<Stack direction="row" alignItems="center">
													<CrumpledPaperIcon /> Compress
												</Stack>
												<ChevronRightIcon />
											</Stack>
										</Button>
									</Flex>
								</li>
							))}
						</ul>
					</Stack>
				</Stack>
			</Stack>

			<Stack>
				<Button size="xl" variant="outline">
					<ArrowLeftIcon />
					Start again
				</Button>
				<Button size="xl">
					<DownloadIcon />
					Download
				</Button>
			</Stack>
		</Stack>
	);
};
*/
