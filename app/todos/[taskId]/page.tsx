import React from 'react'

export default async function Task({
  params,
}: {
  params: Promise<{ taskId: string }>
}) {
  const taskId = (await params).taskId;
  return <div> Подробное описание задачи {taskId}</div>
}
