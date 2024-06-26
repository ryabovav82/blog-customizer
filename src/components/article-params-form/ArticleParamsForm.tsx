import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'components/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { FormEvent, useRef, useState } from 'react';
import { Text } from 'components/text';
import clsx from 'clsx';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	mainState: ArticleStateType;
	setMainState: (param: ArticleStateType) => void;
}
export const ArticleParamsForm = ({
	mainState,
	setMainState,
}: ArticleParamsFormProps) => {
	const formStateData = {
		fontFamily: mainState.fontFamilyOption,
		fontSize: mainState.fontSizeOption,
		fontColor: mainState.fontColor,
		backgroundColor: mainState.backgroundColor,
		contentWidth: mainState.contentWidth,
	};

	const formStateDataReset = {
		fontFamily: fontFamilyOptions[0],
		fontSize: fontSizeOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
	};

	const [formState, setFormState] = useState(formStateData);
	const [isOpen, setIsOpen] = useState(false);

	const rootRef = useRef(null);
	const formRef = useRef(null);

	function resetState() {
		setFormState(formStateDataReset);
	}

	const handlerSubmit = (event: FormEvent) => {
		event.preventDefault();
		setMainState({
			...formState,
			fontFamilyOption: formState.fontFamily,
			fontSizeOption: formState.fontSize,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
		});
		setIsOpen(!isOpen);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton onClick={setIsOpen} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={rootRef}>
				<form className={styles.form} onSubmit={handlerSubmit} ref={formRef}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						onChange={(selected) => {
							setFormState({
								...formState,
								fontFamily: selected,
							});
						}}
						selected={formState.fontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						onChange={(changed) => {
							setFormState({
								...formState,
								fontSize: changed,
							});
						}}
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSize}
						title='Размер шрифта'
					/>
					<Select
						onChange={(selected) => {
							setFormState({
								...formState,
								fontColor: selected,
							});
						}}
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						onChange={(selected) => {
							setFormState({
								...formState,
								backgroundColor: selected,
							});
						}}
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						onChange={(selected) => {
							setFormState({
								...formState,
								contentWidth: selected,
							});
						}}
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button onClick={resetState} title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
