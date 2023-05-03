import { Evaluator, IEvaluator } from 'cloud-evaluate';

// Singleton - Use a shared instance of Evaluator.
const evaluator: IEvaluator = new Evaluator();

export { evaluator };
