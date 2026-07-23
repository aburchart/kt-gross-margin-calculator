export * from './calculateMargins'
export {
  calculateDoorCrasher,
  type DCInputs,
  type DCResults,
} from './calculateDoorCrasher'
export {
  calculateDiscountImpact,
  type DiscountImpactInputs,
  type DiscountImpactResults,
  type DifficultyLevel,
  type ScenarioRow as DiscountImpactScenarioRow,
} from './calculateDiscountImpact'
export {
  INCREMENTALITY,
  calculateForecast,
  type DcPromotionInputs,
  type DcPromotionResults,
  type Verdict,
  type ScenarioRow as DcPromotionScenarioRow,
} from './calculateDcPromotion'
export * from './calculateProductMargins'
