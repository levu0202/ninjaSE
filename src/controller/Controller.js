
export function moveNinja(model, direction)
{
    if (!model.canChangeNinjaPos(direction))
    {
        return;
    }
    model.Ninja.move(direction);
        model.moveCount += 1;
}

export function pickKey(model)
{
    model.getKey();
}