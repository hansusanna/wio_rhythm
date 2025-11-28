// src/components/SubscribeForm.tsx
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z.string().email('이메일 형식이 올바르지 않습니다.'),
})

type FormValues = z.infer<typeof schema>

export default function SubscribeForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    // TODO: 서버 연동 (닷홈 PHP5 게시/외부 SaaS)
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md rounded-xl2 bg-serve p-6 text-text1 shadow-soft">
      <h3 className="h-title text-xl mb-4 text-text0">와인 구독 등록</h3>

      <label className="block mb-2">이름</label>
      <input
        {...register('name')}
        className="w-full rounded-xl2 border border-black/10 bg-white p-3"
        placeholder="홍길동"
      />
      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}

      <label className="block mt-4 mb-2">이메일</label>
      <input
        {...register('email')}
        className="w-full rounded-xl2 border border-black/10 bg-white p-3"
        placeholder="you@example.com"
      />
      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}

      <button
        className={`btn mt-6 ${isSubmitting ? 'btn-disabled' : 'btn-primary'}`}
        disabled={isSubmitting}
      >
        구독 신청
      </button>
    </form>
  )
}
