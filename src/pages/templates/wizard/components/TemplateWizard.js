import React, {
    // useState,
    // useContext,
    // useEffect,
    useCallback,
    // useMemo,
    useRef,
} from 'react';
import { observer } from 'mobx-react';

import { Wizard, translate } from 'polestar-ui-kit';

import { useStores } from 'mobxStore';

import Step0 from './steps/Step0';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';

const TemplateWizard = observer(() => {
    const { wizardStore } = useStores();

    const step0Ref = useRef();
    const step1Ref = useRef();
    const step2Ref = useRef();
    const step3Ref = useRef();
    const stepRefs = useRef([step0Ref, step1Ref, step2Ref, step3Ref]);

    // step0 - validate
    const step0Validate = useCallback(
        (stepIndex) => {
            console.log('TemplateWizard step0Validate stepIndex', stepIndex);
            let isValid = false;
            step0Ref.current.validateFields((err, values) => {
                if (!err) {
                    console.log('TemplateWizard step0Validate values', values);
                    wizardStore.setStepValues(stepIndex, values);
                    isValid = true;
                }
            });
            return isValid;
        },
        [wizardStore],
    );

    // step1 - validate
    const step1Validate = useCallback(
        (stepIndex) => {
            console.log('TemplateWizard step1Validate stepIndex', stepIndex);
            let isValid = false;
            step1Ref.current.validateFields((err, values) => {
                if (!err) {
                    console.log('TemplateWizard step1Validate values', values);
                    wizardStore.setStepValues(stepIndex, values);
                    isValid = true;
                }
            });
            return isValid;
        },
        [wizardStore],
    );

    // step2 - validate
    const step2Validate = useCallback(
        (stepIndex) => {
            console.log('TemplateWizard step2Validate stepIndex', stepIndex);
            let isValid = false;
            step2Ref.current.validateFields((err, values) => {
                if (!err) {
                    console.log('TemplateWizard step2Validate values', values);
                    wizardStore.setStepValues(stepIndex, values);
                    isValid = true;
                }
            });
            return isValid;
        },
        [wizardStore],
    );

    // step3 - validate
    const step3Validate = useCallback(
        (stepIndex) => {
            console.log('TemplateWizard step3Validate stepIndex', stepIndex);
            let isValid = false;
            step3Ref.current.validateFields((err, values) => {
                if (!err) {
                    console.log('TemplateWizard step3Validate values', values);
                    wizardStore.setStepValues(stepIndex, values);
                    isValid = true;
                }
            });
            return isValid;
        },
        [wizardStore],
    );

    const setStepValueByIndex = useCallback(
        (stepIndex) => {
            console.log(
                'TemplateWizard setStepValueByIndex stepIndex',
                stepIndex,
                wizardStore.values[stepIndex],
            );

            stepRefs.current[stepIndex].current.setFieldsValue(
                wizardStore.values[stepIndex],
            );
        },
        [wizardStore.values],
    );

    // 이전버튼 클릭
    const handlePrev = useCallback(
        (stepIndex /* , values */) => {
            console.log('TemplateWizard handlePrev stepIndex', stepIndex);
            wizardStore.setStepValues(
                stepIndex,
                stepRefs.current[stepIndex].current.getFieldsValue(),
            );
        },
        [wizardStore],
    );

    // 이전버튼 클릭 이후 처리
    const handleAfterPrev = useCallback(
        (stepIndex /* , values */) => {
            console.log('TemplateWizard handleAfterPrev stepIndex', stepIndex);

            setStepValueByIndex(stepIndex);
        },
        [setStepValueByIndex],
    );

    // 다음버튼 클릭 이후 처리
    const handleAfterNext = useCallback(
        (stepIndex /* , values */) => {
            console.log('TemplateWizard handleAfterNext stepIndex', stepIndex);

            if (stepIndex === 2) {
                const { values } = wizardStore;
                const step3Value = {
                    ...values[0],
                    ...values[1],
                };
                step2Ref.current.setFieldsValue(step3Value);
            } else {
                setStepValueByIndex(stepIndex);
            }
        },
        [setStepValueByIndex, wizardStore],
    );

    // 저장
    const handleSave = useCallback(
        (/* values , callback */) => {
            console.log('handleSave', wizardStore.values);
            const { values } = wizardStore;
            const result = {
                ...values[0],
                ...values[1],
                ...values[2],
                ...values[3],
            };
            console.log('handleSave', result);

            // TODO REST API 호출 - result 저장
        },
        [wizardStore],
    );

    return (
        <Wizard
            // ref={wizardRef}
            title="외부 연계 로그 리소스 등록"
            isReview={false}
            onPrev={handlePrev}
            onAfterPrev={handleAfterPrev}
            onAfterNext={handleAfterNext}
            onSave={handleSave}
        >
            <Wizard.Step
                title={translate('Step0 타이틀')}
                description="구성정보 수집을 위한 연결정보를 입력하세요."
                validate={step0Validate}
            >
                <Step0 wrappedComponentRef={step0Ref} />
            </Wizard.Step>
            <Wizard.Step
                title={translate('Step1 타이틀')}
                description="로그의 패턴을 설정하세요."
                validate={step1Validate}
            >
                <Step1 wrappedComponentRef={step1Ref} />
            </Wizard.Step>
            <Wizard.Step
                title={translate('Step2 타이틀')}
                description={translate('연결정보의 매핑결과를 확인하세요.')}
                validate={step2Validate}
            >
                <Step2 wrappedComponentRef={step2Ref} />
            </Wizard.Step>
            <Wizard.Step
                title={translate('Step3 타이틀')}
                description={translate('연결정보의 매핑결과를 확인하세요.')}
                validate={step3Validate}
            >
                <Step3 ref={step3Ref} />
            </Wizard.Step>
        </Wizard>
    );
});

export default TemplateWizard;
