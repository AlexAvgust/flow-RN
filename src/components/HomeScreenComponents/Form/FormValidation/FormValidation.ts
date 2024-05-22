import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
    start_time: Yup.date().required(),
    end_time: Yup.date().required(),
    date: Yup.date().required(),
    task_name: Yup.string().required(),
    description: Yup.string(),
    priority: Yup.string(),
    repeating: Yup.boolean(),
})
