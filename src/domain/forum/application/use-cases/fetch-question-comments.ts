import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comments'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsAnswersUseCaseRequest {
  page: number
  questionId: string
}

type FetchQuestionCommentsAnswersUseCaseResponse = Either<
  null,
  { questionComments: QuestionComment[] }
>

export class FetchQuestionCommentsAnswersUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsAnswersUseCaseRequest): Promise<FetchQuestionCommentsAnswersUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({ questionComments })
  }
}
