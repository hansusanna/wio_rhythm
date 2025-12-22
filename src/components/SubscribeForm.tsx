// src/components/SubscribeForm.tsx
import { useState } from 'react'; 
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle } from 'lucide-react'; 
const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z.string().email('이메일 형식이 올바르지 않습니다.'),
});

type FormValues = z.infer<typeof schema>;

type SubscribeFormProps = {
  onClose?: () => void; // 모달 닫기용 함수 (선택 사항)
};

export default function SubscribeForm({ onClose }: SubscribeFormProps) {
  const [isCompleted, setIsCompleted] = useState(false); // 제출 완료 상태

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch('https://wiorhythm.dothome.co.kr/api/subscribe.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.success) {
        // 성공 시 완료 화면으로 전환
        setIsCompleted(true);
      } else {
        alert('신청 중 오류가 발생했습니다: ' + result.message);
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('서버 통신 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  // 1. 제출 완료 시 보여줄 화면
  if (isCompleted) {
    return (
      <div className="mx-auto max-w-md rounded-xl bg-white p-8 text-center shadow-lg border border-ui-border">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-brand-accent" />
        </div>
        <h3 className="text-2xl font-bold text-brand-dark mb-2">신청이 완료되었습니다!</h3>
        <p className="text-ui-gray mb-6">
          서비스가 오픈되면 입력하신 이메일로<br />가장 먼저 알림을 보내드릴게요.
        </p>
        <button
          onClick={onClose}
          className="btn btn-primary w-full py-3 rounded-lg bg-brand-primary text-white font-bold hover:bg-brand-dark transition-colors"
        >
          확인
        </button>
      </div>
    );
  }

  // 2. 기본 입력 폼
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-lg border border-ui-border"
    >
      <h3 className="text-xl font-bold mb-1 text-brand-dark">와인 구독 사전 신청</h3>
      <p className="text-sm text-ui-gray mb-6">지금 신청하고 얼리버드 혜택을 받아보세요.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ui-gray mb-1">이름</label>
          <input
            {...register('name')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
            placeholder="홍길동"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-ui-gray mb-1">이메일</label>
          <input
            {...register('email')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-lg bg-brand-accent py-3 font-bold text-white transition-colors hover:bg-brand-accent/90 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? '신청 중...' : '구독 신청하기'}
      </button>
    </form>
  );
}