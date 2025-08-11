"""Utility functions for calculating lasagna preparation and baking times."""

EXPECTED_BAKE_TIME = 40  # minutes
PREPARATION_TIME = 2     # minutes per layer


def bake_time_remaining(elapsed_bake_time: int) -> int:
    """Return remaining bake time in minutes."""
    remaining_time = EXPECTED_BAKE_TIME - elapsed_bake_time
    return remaining_time


def preparation_time_in_minutes(number_of_layers: int) -> int:
    """Return total preparation time in minutes given number of layers."""
    return number_of_layers * PREPARATION_TIME


def elapsed_time_in_minutes(number_of_layers: int, elapsed_bake_time: int) -> int:
    """Return total elapsed time (prep + baking elapsed) in minutes."""
    return preparation_time_in_minutes(number_of_layers) + elapsed_bake_time
