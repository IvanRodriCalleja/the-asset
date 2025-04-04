import { useForm } from 'react-hook-form';

export type SplitEqualRangesForm = {
	splitAfterNPages: number;
};

export const useSplitEqualRanges = () => {
	const form = useForm<SplitEqualRangesForm>({
		defaultValues: {
			splitAfterNPages: 1
		}
	});

	return {
		form
	};
};
